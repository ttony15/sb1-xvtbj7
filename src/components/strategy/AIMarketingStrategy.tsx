import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, CheckCircle, XCircle, Edit2, Download, Send, AlertCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import CompanyOverview from '../onboarding/analysis/CompanyOverview';
import CampaignProposals from '../onboarding/analysis/CampaignProposals';
import MarketingObjectives from '../onboarding/analysis/MarketingObjectives';
import CampaignTimeline from '../onboarding/analysis/CampaignTimeline';
import ContentCalendar from '../ContentCalendar';

interface SectionStatus {
  companyProfile: 'pending' | 'approved' | 'changes';
  objectives: 'pending' | 'approved' | 'changes';
  campaigns: 'pending' | 'approved' | 'changes';
  timeline: 'pending' | 'approved' | 'changes';
  calendar: 'pending' | 'approved' | 'changes';
}

function AIMarketingStrategy() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sectionStatus, setSectionStatus] = useState<SectionStatus>({
    companyProfile: 'pending',
    objectives: 'pending',
    campaigns: 'pending',
    timeline: 'pending',
    calendar: 'pending'
  });

  // Mock data for components
  const mockCompanyInfo = {
    name: "Your Company",
    logo: "https://via.placeholder.com/150",
    industry: "Technology",
    size: "50-200 employees",
    founded: "2020",
    background: "A leading innovator in the technology space...",
    strengths: [
      "Strong technical expertise",
      "Innovative product portfolio",
      "High customer satisfaction"
    ],
    challenges: [
      "Increasing market competition",
      "Rapid technological changes",
      "Long sales cycles"
    ],
    marketPosition: {
      currentShare: "8%",
      growth: "+45% YoY",
      competitors: ["Competitor A", "Competitor B", "Competitor C"],
      differentiators: [
        "Advanced AI capabilities",
        "Enterprise-grade security",
        "Superior support"
      ]
    }
  };

  const mockObjectives = [
    {
      category: 'Brand Awareness',
      target: '+50% brand recognition',
      timeline: 'Q2-Q4 2024',
      metrics: ['Social media growth', 'Website traffic', 'Brand mentions']
    },
    {
      category: 'Lead Generation',
      target: '1,000 qualified leads',
      timeline: 'Q2-Q4 2024',
      metrics: ['MQLs', 'SQLs', 'Conversion rate']
    }
  ];

  const mockTimeline = {
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
        event: 'First Review',
        status: 'pending'
      }
    ]
  };

  const mockCampaigns = [
    {
      id: 'camp-1',
      name: "Product Innovation Showcase",
      description: "Highlight technological leadership",
      objectives: ["Establish thought leadership", "Drive awareness"],
      audience: {
        segments: ["CTOs", "IT Leaders"],
        interests: ["Digital Transformation", "AI/ML"],
        behavior: ["Research-driven"]
      },
      channels: ["LinkedIn", "Twitter"],
      timeline: "3 months",
      metrics: [
        { name: "Awareness", target: "+40%" },
        { name: "Leads", target: "500" }
      ],
      budget: {
        range: "$50,000 - $75,000",
        allocation: {
          'Content': '30%',
          'Paid': '40%',
          'Events': '30%'
        }
      }
    }
  ];

  const handleStatusChange = (section: keyof SectionStatus, status: 'approved' | 'changes') => {
    setSectionStatus(prev => ({ ...prev, [section]: status }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Marketing Strategy Plan</h1>
                <p className="text-sm text-gray-500">Review and approve your AI-generated strategy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Finalize Strategy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <CompanyOverview 
            companyInfo={mockCompanyInfo}
            onEdit={() => handleStatusChange('companyProfile', 'changes')}
          />
        </div>

        {/* Marketing Objectives */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <MarketingObjectives objectives={mockObjectives} />
        </div>

        {/* Campaign Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <CampaignTimeline timeline={mockTimeline} />
        </div>

        {/* Campaign Proposals */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <CampaignProposals campaigns={mockCampaigns} />
        </div>

        {/* Content Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <p className="text-gray-500 mb-6">Strategic content schedule for your marketing campaigns</p>
          <ContentCalendar isFullCalendar={true} />
        </div>
      </div>
    </div>
  );
}

export default AIMarketingStrategy;