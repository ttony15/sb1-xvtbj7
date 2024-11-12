import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const postSchema = z.object({
  content: z.string(),
  mediaUrls: z.array(z.string()).optional(),
  scheduledFor: z.string().datetime().optional(),
  platform: z.enum(['instagram', 'twitter', 'facebook']),
  socialAccountId: z.string()
});

// Create post
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const data = postSchema.parse(req.body);

    const post = await prisma.post.create({
      data: {
        ...data,
        status: data.scheduledFor ? 'scheduled' : 'draft',
        mediaUrls: data.mediaUrls ? JSON.stringify(data.mediaUrls) : null,
        userId
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, platform, startDate, endDate } = req.query;

    const where = {
      userId,
      ...(status && { status }),
      ...(platform && { platform }),
      ...(startDate && endDate && {
        scheduledFor: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const posts = await prisma.post.findMany({
      where,
      include: {
        socialAccount: true,
        analytics: true
      },
      orderBy: {
        scheduledFor: 'asc'
      }
    });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = postSchema.parse(req.body);

    const post = await prisma.post.update({
      where: {
        id,
        userId
      },
      data: {
        ...data,
        mediaUrls: data.mediaUrls ? JSON.stringify(data.mediaUrls) : null
      }
    });

    res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await prisma.post.delete({
      where: {
        id,
        userId
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

export default router;