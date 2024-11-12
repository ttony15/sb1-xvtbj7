import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get analytics for all posts
router.get('/posts', async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, platform } = req.query;

    const where = {
      userId,
      ...(platform && { platform }),
      ...(startDate && endDate && {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const analytics = await prisma.analytics.findMany({
      where,
      include: {
        post: true,
        socialAccount: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    res.json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

// Get analytics for a specific post
router.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const analytics = await prisma.analytics.findFirst({
      where: {
        postId,
        userId
      },
      include: {
        post: true,
        socialAccount: true
      }
    });

    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }

    res.json(analytics);
  } catch (error) {
    console.error('Get post analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch post analytics' });
  }
});

// Get account performance metrics
router.get('/performance', async (req, res) => {
  try {
    const userId = req.user.id;
    const { platform, period = '7d' } = req.query;

    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const metrics = await prisma.analytics.groupBy({
      by: ['socialAccountId'],
      where: {
        userId,
        ...(platform && { platform }),
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        reach: true,
        impressions: true,
        engagement: true,
        likes: true,
        comments: true,
        shares: true,
        clicks: true
      }
    });

    res.json(metrics);
  } catch (error) {
    console.error('Get performance metrics error:', error);
    res.status(500).json({ message: 'Failed to fetch performance metrics' });
  }
});

export default router;