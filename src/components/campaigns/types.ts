export interface CampaignPhase {
  name: string;
  duration: string;
  objectives: string[];
  content: {
    type: string;
    frequency: string;
    channels: string[];
  }[];
  kpis: {
    metric: string;
    target: string;
    current: string;
  }[];
}

export interface CampaignMetric {
  name: string;
  current: string;
  target: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface CampaignBudget {
  total: string;
  allocation: {
    [key: string]: string;
  };
  roi: {
    projected: string;
    current: string;
  };
}

export interface CampaignAudience {
  demographics: string;
  interests: string[];
  behavior: string[];
}

export interface CampaignContentStrategy {
  themes: string[];
  formats: {
    [key: string]: string;
  };
  distribution: {
    organic: string;
    paid: string;
  };
}

export interface CampaignTimeline {
  start: string;
  end: string;
  milestones: {
    date: string;
    event: string;
    status: 'pending' | 'completed' | 'in-progress';
  }[];
}

export interface CampaignPerformance {
  metrics: CampaignMetric[];
  insights: string[];
}

export interface GeneratedCampaign {
  name: string;
  description: string;
  phases: CampaignPhase[];
  budget: CampaignBudget;
  audience: {
    primary: CampaignAudience;
    secondary: CampaignAudience;
  };
  contentStrategy: CampaignContentStrategy;
  timeline: CampaignTimeline;
  performance: CampaignPerformance;
}