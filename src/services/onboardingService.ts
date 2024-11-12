import api from './api';

export interface OnboardingData {
  companyProfile?: {
    name: string;
    industry: string;
    size: string;
    description: string;
    competitors: string[];
    website: string;
  };
  brandVoice?: {
    personality: {
      traits: string[];
      tone: string;
    };
    values: string[];
    messaging: {
      keyMessages: string[];
      uniqueValue: string;
      tagline: string;
    };
    visualStyle: {
      colors: string[];
      style: string;
    };
  };
  targetAudience?: {
    demographics: {
      ageRanges: string[];
      locations: string[];
      jobTitles: string[];
      industries: string[];
    };
    interests: string[];
    challenges: string[];
    goals: string[];
  };
  contentPreferences?: {
    contentTypes: string[];
    topics: string[];
    tone: string;
    frequency: {
      posts: string;
      platforms: string[];
    };
    hashtags: string[];
  };
  marketingGoals?: {
    objectives: Array<{
      type: string;
      target: string;
      timeline: string;
    }>;
    kpis: string[];
    budget: {
      range: string;
      allocation: Record<string, number>;
    };
    timeline: {
      startDate: string;
      milestones: Array<{
        date: string;
        description: string;
      }>;
    };
  };
  additionalInfo?: {
    challenges: string;
    competitors: string[];
    targetAudience: string;
    additionalNotes?: string;
  };
}

class OnboardingService {
  async saveOnboardingData(data: Partial<OnboardingData>): Promise<void> {
    try {
      // Serialize the data to ensure it's cloneable
      const serializedData = JSON.parse(JSON.stringify(data));
      await api.post('/onboarding', serializedData);
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      throw new Error('Failed to save onboarding data. Please try again.');
    }
  }

  async getOnboardingData(): Promise<OnboardingData | null> {
    try {
      const response = await api.get('/onboarding');
      return response.data;
    } catch (error) {
      console.error('Failed to get onboarding data:', error);
      return null;
    }
  }

  async skipOnboarding(): Promise<void> {
    try {
      const defaultData: OnboardingData = {
        companyProfile: {
          name: 'Demo Company',
          industry: 'Technology',
          size: 'Small Business',
          description: 'Technology company focused on innovation.',
          competitors: ['Competitor 1', 'Competitor 2'],
          website: 'https://example.com'
        },
        brandVoice: {
          personality: {
            traits: ['Professional', 'Innovative'],
            tone: 'Professional'
          },
          values: ['Innovation', 'Quality', 'Customer Focus'],
          messaging: {
            keyMessages: ['Innovative solutions', 'Customer success'],
            uniqueValue: 'Cutting-edge technology solutions',
            tagline: 'Innovating for tomorrow'
          },
          visualStyle: {
            colors: ['#2563eb', '#1e40af'],
            style: 'Modern'
          }
        },
        marketingGoals: {
          objectives: [{
            type: 'Brand Awareness',
            target: '50% increase',
            timeline: '6 months'
          }],
          kpis: ['Social Media Engagement', 'Website Traffic'],
          budget: {
            range: '$1,000 - $5,000/month',
            allocation: { social: 40, content: 60 }
          },
          timeline: {
            startDate: new Date().toISOString(),
            milestones: []
          }
        }
      };

      await this.saveOnboardingData(defaultData);
    } catch (error) {
      console.error('Failed to skip onboarding:', error);
      throw new Error('Failed to skip onboarding. Please try again.');
    }
  }

  async getOnboardingStatus(): Promise<boolean> {
    try {
      const response = await api.get('/onboarding/status');
      return response.data.completed;
    } catch (error) {
      console.error('Failed to get onboarding status:', error);
      return false;
    }
  }
}

export default new OnboardingService();