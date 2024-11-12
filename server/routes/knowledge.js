import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const documentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['article', 'guide', 'policy', 'template']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  collectionId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional()
});

const collectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
  teamId: z.string().uuid().optional()
});

// Create document
router.post('/documents', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = documentSchema.parse(req.body);

    // Get user's workspace
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { workspace: true }
    });

    if (!user?.workspace) {
      return res.status(400).json({ message: 'User must belong to a workspace' });
    }

    const document = await prisma.document.create({
      data: {
        ...data,
        userId,
        workspaceId: user.workspace.id,
        tags: {
          connectOrCreate: data.tags?.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          })) || []
        }
      },
      include: {
        tags: true,
        collection: true
      }
    });

    // Create initial version
    await prisma.documentVersion.create({
      data: {
        content: data.content,
        documentId: document.id
      }
    });

    res.status(201).json(document);
  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({ message: 'Failed to create document' });
  }
});

// Get documents
router.get('/documents', async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, status, collectionId } = req.query;

    const documents = await prisma.document.findMany({
      where: {
        userId,
        ...(type && { type }),
        ...(status && { status }),
        ...(collectionId && { collectionId })
      },
      include: {
        tags: true,
        collection: true,
        versions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

// Create collection
router.post('/collections', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = collectionSchema.parse(req.body);

    // Get user's workspace
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { workspace: true }
    });

    if (!user?.workspace) {
      return res.status(400).json({ message: 'User must belong to a workspace' });
    }

    const collection = await prisma.collection.create({
      data: {
        ...data,
        userId,
        workspaceId: user.workspace.id
      },
      include: {
        documents: {
          include: {
            tags: true
          }
        }
      }
    });

    res.status(201).json(collection);
  } catch (error) {
    console.error('Create collection error:', error);
    res.status(500).json({ message: 'Failed to create collection' });
  }
});

// Get collections
router.get('/collections', async (req, res) => {
  try {
    const userId = req.user.id;

    const collections = await prisma.collection.findMany({
      where: {
        userId,
        OR: [
          { isPublic: true },
          { userId }
        ]
      },
      include: {
        documents: {
          include: {
            tags: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(collections);
  } catch (error) {
    console.error('Get collections error:', error);
    res.status(500).json({ message: 'Failed to fetch collections' });
  }
});

// Generate AI content suggestions
router.post('/documents/:id/suggest', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const document = await prisma.document.findFirst({
      where: {
        id,
        userId
      },
      include: {
        tags: true
      }
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Here you would integrate with your AI service
    // For now, we'll return mock suggestions
    const suggestions = [
      {
        type: 'content',
        suggestion: 'Consider adding more details about feature benefits'
      },
      {
        type: 'structure',
        suggestion: 'Break down the long paragraph into bullet points'
      },
      {
        type: 'seo',
        suggestion: 'Add more industry-specific keywords'
      }
    ];

    res.json(suggestions);
  } catch (error) {
    console.error('Generate suggestions error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
});

export default router;