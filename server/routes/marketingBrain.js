import express from 'express';
import { PrismaClient } from '@prisma/client';
import marketingBrainService from '../services/marketingBrain.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get marketing brain context
router.get('/context', authenticate, async (req, res) => {
  try {
    const context = await marketingBrainService.getCompanyContext(req.user.workspaceId);
    res.json(context);
  } catch (error) {
    console.error('Get marketing context error:', error);
    res.status(500).json({ message: 'Failed to fetch marketing context' });
  }
});

// Get live AI insights
router.get('/insights', authenticate, async (req, res) => {
  try {
    const insights = await marketingBrainService.generateLiveInsights(req.user.workspaceId);
    res.json(insights);
  } catch (error) {
    console.error('Get live insights error:', error);
    res.status(500).json({ message: 'Failed to generate insights' });
  }
});

// Process AI query
router.post('/query', authenticate, async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const response = await marketingBrainService.processAiQuery(query, req.user.workspaceId);
    res.json(response);
  } catch (error) {
    console.error('Process AI query error:', error);
    res.status(500).json({ message: 'Failed to process query' });
  }
});

export default router;