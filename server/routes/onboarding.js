import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Save onboarding data
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      companyProfile,
      targetAudience,
      contentPreferences,
      brandVoice,
      marketingGoals,
      additionalInfo
    } = req.body;

    // Create or update onboarding data
    const onboarding = await prisma.onboardingData.upsert({
      where: { userId },
      update: { completed: true },
      create: {
        userId,
        completed: true
      }
    });

    // Save company profile
    if (companyProfile) {
      await prisma.companyProfile.upsert({
        where: { onboardingId: onboarding.id },
        update: companyProfile,
        create: {
          ...companyProfile,
          onboardingId: onboarding.id
        }
      });
    }

    // Save target audience
    if (targetAudience) {
      await prisma.targetAudience.upsert({
        where: { onboardingId: onboarding.id },
        update: targetAudience,
        create: {
          ...targetAudience,
          onboardingId: onboarding.id
        }
      });
    }

    // Save content preferences
    if (contentPreferences) {
      await prisma.contentPreferences.upsert({
        where: { onboardingId: onboarding.id },
        update: contentPreferences,
        create: {
          ...contentPreferences,
          onboardingId: onboarding.id
        }
      });
    }

    // Save brand voice
    if (brandVoice) {
      await prisma.brandVoice.upsert({
        where: { onboardingId: onboarding.id },
        update: brandVoice,
        create: {
          ...brandVoice,
          onboardingId: onboarding.id
        }
      });
    }

    // Save marketing goals
    if (marketingGoals) {
      await prisma.marketingGoals.upsert({
        where: { onboardingId: onboarding.id },
        update: marketingGoals,
        create: {
          ...marketingGoals,
          onboardingId: onboarding.id
        }
      });
    }

    // Save additional info
    if (additionalInfo) {
      await prisma.additionalInfo.upsert({
        where: { onboardingId: onboarding.id },
        update: additionalInfo,
        create: {
          ...additionalInfo,
          onboardingId: onboarding.id
        }
      });
    }

    // Update user's onboarding status
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true }
    });

    res.status(200).json({ message: 'Onboarding completed successfully' });
  } catch (error) {
    console.error('Onboarding save error:', error);
    res.status(500).json({ message: 'Failed to save onboarding data' });
  }
});

// Get onboarding data
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const onboardingData = await prisma.onboardingData.findUnique({
      where: { userId },
      include: {
        companyProfile: true,
        targetAudience: true,
        contentPreferences: true,
        brandVoice: true,
        marketingGoals: true,
        additionalInfo: true
      }
    });

    res.json(onboardingData);
  } catch (error) {
    console.error('Get onboarding data error:', error);
    res.status(500).json({ message: 'Failed to fetch onboarding data' });
  }
});

export default router;