export interface CompanyProfile {
  name: string;
  website: string;
  industry: string;
  size: string;
  description: string;
  logo?: string;
  competitors: string[];
}

export interface BrandVoice {
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
}

export interface TargetAudience {
  demographics: {
    ageRanges: string[];
    locations: string[];
    jobTitles: string[];
    industries: string[];
  };
  interests: string[];
  challenges: string[];
  goals: string[];
  behaviors: string[];
}

export interface ContentPreferences {
  contentTypes: string[];
  topics: string[];
  tone: string;
  frequency: {
    posts: string;
    platforms: string[];
  };
  hashtags: string[];
  mediaPreferences: {
    imageTypes: string[];
    videoTypes: string[];
  };
}

export interface MarketingGoals {
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
}

export interface AdditionalInfo {
  marketingChallenges: string;
  successMetrics: string[];
  competitorStrategy: string;
  pastExperience: string;
  additionalNotes?: string;
}

export interface OnboardingData {
  companyProfile: CompanyProfile;
  brandVoice: BrandVoice;
  targetAudience: TargetAudience;
  contentPreferences: ContentPreferences;
  marketingGoals: MarketingGoals;
  additionalInfo: AdditionalInfo;
}

export type OnboardingStep = keyof OnboardingData;

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'companyProfile',
  'brandVoice',
  'targetAudience',
  'contentPreferences',
  'marketingGoals',
  'additionalInfo'
];

export const STEP_TITLES: Record<OnboardingStep, string> = {
  companyProfile: 'Company Profile',
  brandVoice: 'Brand Voice',
  targetAudience: 'Target Audience',
  contentPreferences: 'Content Preferences',
  marketingGoals: 'Marketing Goals',
  additionalInfo: 'Additional Information'
};

export const STEP_DESCRIPTIONS: Record<OnboardingStep, string> = {
  companyProfile: 'Tell us about your business',
  brandVoice: 'Define your brand personality and messaging',
  targetAudience: 'Identify who you want to reach',
  contentPreferences: 'Set your content strategy',
  marketingGoals: 'Define your marketing objectives',
  additionalInfo: 'Share additional context and requirements'
};