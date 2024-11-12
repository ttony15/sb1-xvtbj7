import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingData } from '../../types/onboarding';
import CompanyOverview from './analysis/CompanyOverview';
import CampaignProposals from './analysis/CampaignProposals';
import MarketingObjectives from './analysis/MarketingObjectives';
import CampaignTimeline from './analysis/CampaignTimeline';

interface AIAnalysisResultsProps {
  onboardingData: OnboardingData;
}

function AIAnalysisResults({ onboardingData }: AIAnalysisResultsProps) {
  const navigate = useNavigate();

  const companyAnalysis = {
    name: onboardingData.companyProfile?.name || 'Company Name',
    logo: 'https://via.placeholder.com/150',
    industry: onboardingData.companyProfile?.industry || 'Technology',
    size: onboardingData.companyProfile?.size || '50-200 employees',
    founded: '2020',
    background: `A leading innovator in the ${onboardingData.companyProfile?.industry} space, focused on delivering cutting-edge solutions to enterprise clients.`,
    strengths: [
      'Strong technical expertise in AI/ML',
      'Established enterprise client base',
      'Innovative product portfolio',
      'High customer satisfaction rates'
    ],
    challenges: [
      'Increasing market competition',
      'Rapid technological changes',
      'Long enterprise sales cycles',
      'Need for market education'
    ],
    marketPosition: {
      currentShare: '8%',
      growth: '+45% YoY',
      competitors: [
        'Major Tech Co.',
        'Enterprise Solutions Inc.',
        'AI Innovations Ltd.'
      ],
      differentiators: [
        'Advanced AI capabilities',
        'Enterprise-grade security',
        'Seamless integration',
        'Superior customer support'
      ]
    }
  };

  const marketingObjectives = [
    {
      category: 'Brand Awareness',
      target: '+50% brand recognition',
      timeline: 'Q2-Q4 2024',
      metrics: [
        'Social media following growth',
        'Website traffic increase',
        'Brand mention frequency',
        'Share of voice in industry'
      ]
    },
    {
      category: 'Lead Generation',
      target: '1,000 qualified leads',
      timeline: 'Q2-Q4 2024',
      metrics: [
        'Marketing qualified leads (MQLs)',
        'Sales qualified leads (SQLs)',
        'Conversion rate',
        'Cost per acquisition'
      ]
    },
    {
      category: 'Customer Engagement',
      target: '25% engagement rate',
      timeline: 'Q2-Q4 2024',
      metrics: [
        'Social media engagement',
        'Email open rates',
        'Content interaction',
        'Customer feedback'
      ]
    },
    {
      category: 'Market Share',
      target: '15% market share',
      timeline: 'Q2-Q4 2024',
      metrics: [
        'Revenue growth',
        'Customer acquisition',
        'Market penetration',
        'Competitive win rate'
      ]
    }
  ];

  const campaignProposals = [
    {
      id: 'camp-1',
      name: 'Product Innovation Showcase',
      description: 'A multi-channel campaign highlighting our technological leadership and innovative solutions.',
      objectives: [
        'Establish thought leadership position',
        'Drive product awareness',
        'Generate high-quality leads',
        'Increase market share'
      ],
      audience: {
        segments: [
          'CTOs and Technical Decision Makers',
          'Enterprise IT Leaders',
          'Innovation Directors'
        ],
        interests: [
          'Digital Transformation',
          'AI/ML Technologies',
          'Enterprise Solutions'
        ],
        behavior: [
          'Research-driven decision making',
          'Early technology adopters',
          'Value-focused purchasing'
        ]
      },
      channels: [
        'LinkedIn - Primary',
        'Twitter - Secondary',
        'Industry Publications',
        'Tech Events'
      ],
      timeline: '3 months (Q2 2024)',
      metrics: [
        {
          name: 'Brand Awareness',
          target: '+40% recognition'
        },
        {
          name: 'Lead Generation',
          target: '500 MQLs'
        },
        {
          name: 'Engagement Rate',
          target: '25%'
        }
      ],
      budget: {
        range: '$50,000 - $75,000',
        allocation: {
          'Content Creation': '30%',
          'Paid Media': '40%',
          'Events': '20%',
          'Tools & Analytics': '10%'
        }
      },
      contentPlan: [
        {
          week: 1,
          theme: 'Innovation Leadership',
          content: [
            'Thought leadership article',
            'Technical whitepaper',
            'LinkedIn posts (3x)',
            'Twitter thread'
          ]
        },
        {
          week: 2,
          theme: 'Product Deep Dive',
          content: [
            'Product demo video',
            'Technical blog post',
            'Case study',
            'Social media updates (5x)'
          ]
        }
      ]
    },
    {
      id: 'camp-2',
      name: 'Enterprise Success Stories',
      description: 'Customer-centric campaign showcasing real-world implementation success stories.',
      objectives: [
        'Build credibility',
        'Showcase ROI',
        'Drive enterprise adoption',
        'Generate referrals'
      ],
      audience: {
        segments: [
          'Enterprise Decision Makers',
          'Industry Leaders',
          'Potential Customers'
        ],
        interests: [
          'Business Transformation',
          'ROI Optimization',
          'Enterprise Technology'
        ],
        behavior: [
          'ROI-focused decision making',
          'Peer recommendation driven',
          'Solution research'
        ]
      },
      channels: [
        'Industry Events',
        'LinkedIn',
        'Email Campaigns',
        'Webinars'
      ],
      timeline: '4 months (Q2-Q3 2024)',
      metrics: [
        {
          name: 'Case Studies',
          target: '10 published'
        },
        {
          name: 'Lead Quality',
          target: '35% conversion'
        },
        {
          name: 'Referrals',
          target: '+50%'
        }
      ],
      budget: {
        range: '$75,000 - $100,000',
        allocation: {
          'Content Production': '35%',
          'Event Marketing': '30%',
          'Digital Advertising': '25%',
          'Analytics': '10%'
        }
      },
      contentPlan: [
        {
          week: 1,
          theme: 'Success Stories',
          content: [
            'Video testimonials',
            'Written case studies',
            'ROI analysis reports',
            'Social proof content'
          ]
        },
        {
          week: 2,
          theme: 'Implementation Journey',
          content: [
            'Technical implementation guides',
            'Best practices documentation',
            'Expert interviews',
            'Process infographics'
          ]
        }
      ]
    }
  ];

  const timeline = {
    start: '2024-04-01',
    end: '2024-12-31',
    milestones: [
      {
        date: '2024-04-15',
        event: 'Campaign Launch',
        status: 'pending'
      },
      {
        date: '2024-05-01',
        event: 'First Performance Review',
        status: 'pending'
      },
      {
        date: '2024-06-15',
        event: 'Mid-Year Strategy Adjustment',
        status: 'pending'
      },
      {
        date: '2024-09-01',
        event: 'Q3 Performance Analysis',
        status: 'pending'
      },
      {
        date: '2024-12-15',
        event: 'Year-End Review',
        status: 'pending'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Company Overview */}
        <CompanyOverview 
          companyInfo={companyAnalysis}
          onEdit={() => console.log('Edit company info')}
        />

        {/* Marketing Objectives */}
        <MarketingObjectives objectives={marketingObjectives} />

        {/* Campaign Timeline */}
        <CampaignTimeline timeline={timeline} />

        {/* Campaign Proposals */}
        <CampaignProposals campaigns={campaignProposals} />

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysisResults;