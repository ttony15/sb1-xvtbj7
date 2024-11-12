import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';
import socialAuthService from '../services/socialAuth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get auth URL for platform
router.get('/:platform/auth', authenticate, async (req, res) => {
  try {
    const { platform } = req.params;
    const authUrl = socialAuthService.getAuthUrl(platform);
    res.json({ authUrl });
  } catch (error) {
    console.error('Get auth URL error:', error);
    res.status(500).json({ message: 'Failed to get authentication URL' });
  }
});

// Handle OAuth callback
router.post('/:platform/callback', authenticate, async (req, res) => {
  try {
    const { platform } = req.params;
    const { code } = req.body;
    const userId = req.user.id;

    if (!code) {
      return res.status(400).json({ message: 'Authorization code is required' });
    }

    const account = await socialAuthService.handleCallback(platform, code, userId);
    res.json(account);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ message: 'Failed to connect account' });
  }
});

// Get connected accounts
router.get('/accounts', authenticate, async (req, res) => {
  try {
    const accounts = await prisma.socialAccount.findMany({
      where: {
        userId: req.user.id,
        isActive: true
      }
    });
    res.json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ message: 'Failed to fetch connected accounts' });
  }
});

// Disconnect account
router.delete('/accounts/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.socialAccount.update({
      where: {
        id,
        userId: req.user.id
      },
      data: {
        isActive: false,
        accessToken: null,
        refreshToken: null
      }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Disconnect account error:', error);
    res.status(500).json({ message: 'Failed to disconnect account' });
  }
});

// Refresh access token
router.post('/accounts/:id/refresh', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const account = await socialAuthService.refreshToken(id);
    res.json(account);
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Failed to refresh access token' });
  }
});

export default router;