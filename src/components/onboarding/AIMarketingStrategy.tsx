import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, CheckCircle, XCircle, Edit2, Download, Send, AlertCircle } from 'lucide-react';
import CompanyOverview from './analysis/CompanyOverview';
import CampaignProposals from './analysis/CampaignProposals';
import MarketingObjectives from './analysis/MarketingObjectives';
import CampaignTimeline from './analysis/CampaignTimeline';
import ContentCalendar from '../ContentCalendar';

interface SectionStatus {
  companyProfile: 'pending' | 'approved' | 'changes';
  objectives: 'pending' | 'approved' | 'changes';
  campaigns: 'pending' | 'approved' | 'changes';
  timeline: 'pending' | 'approved' | 'changes';
  calendar: 'pending' | 'approved' | 'changes';
}

function AIMarketingStrategy({ onboardingData }: { onboardingData: any }) {
  const navigate = useNavigate();
  const [sectionStatus, setSectionStatus] = useState<SectionStatus>({
    companyProfile: 'pending',
    objectives: 'pending',
    campaigns: 'pending',
    timeline: 'pending',
    calendar: 'pending'
  });
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [activeFeedbackSection, setActiveFeedbackSection] = useState('');

  // Mock data for demonstration
  const companyAnalysis = {
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

  const marketingObjectives = [
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
        event: 'First Review',
        status: 'pending'
      }
    ]
  };

  const campaignProposals = [
    {
      id: 'camp-1',
      name: 'Product Innovation Showcase',
      description: 'Highlight technological leadership',
      objectives: ['Establish thought leadership', 'Drive awareness'],
      audience: {
        segments: ['CTOs', 'IT Leaders'],
        interests: ['Digital Transformation', 'AI/ML'],
        behavior: ['Research-driven']
      },
      channels: ['LinkedIn', 'Twitter'],
      timeline: '3 months',
      metrics: [
        { name: 'Awareness', target: '+40%' },
        { name: 'Leads', target: '500' }
      ],
      budget: {
        range: '$50,000 - $75,000',
        allocation: {
          'Content': '30%',
          'Paid': '40%',
          'Events': '30%'
        }
      }
    }
  ];

  const handleStatusChange = (section: keyof SectionStatus, status: 'approved' | 'changes') => {
    if (status === 'changes') {
      setActiveFeedbackSection(section);
      setShowFeedbackModal(true);
    } else {
      setSectionStatus(prev => ({ ...prev, [section]: status }));
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    setFeedback(prev => ({ ...prev, [activeFeedbackSection]: feedback }));
    setSectionStatus(prev => ({ ...prev, [activeFeedbackSection]: 'changes' }));
    setShowFeedbackModal(false);
  };

  const allSectionsApproved = Object.values(sectionStatus).every(status => status === 'approved');

  const FeedbackModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Changes</h3>
        <textarea
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the changes needed..."
          value={feedback[activeFeedbackSection] || ''}
          onChange={(e) => setFeedback(prev => ({ ...prev, [activeFeedbackSection]: e.target.value }))}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowFeedbackModal(false)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => handleFeedbackSubmit(feedback[activeFeedbackSection] || '')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, section }: { title: string; section: keyof SectionStatus }) => (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-3">
        {sectionStatus[section] === 'changes' && (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Changes Requested</span>
          </div>
        )}
        <button
          onClick={() => handleStatusChange(section, 'approved')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
            sectionStatus[section] === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Approve</span>
        </button>
        <button
          onClick={() => handleStatusChange(section, 'changes')}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-red-50 hover:text-red-700"
        >
          <Edit2 className="w-4 h-4" />
          <span>Request Changes</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress */}
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
                disabled={!allSectionsApproved}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {allSectionsApproved ? 'Finalize Strategy' : 'Approve All Sections'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <SectionHeader title="Company Profile" section="companyProfile" />
          <CompanyOverview 
            companyInfo={companyAnalysis}
            onEdit={() => handleStatusChange('companyProfile', 'changes')}
          />
        </div>

        {/* Marketing Objectives */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <SectionHeader title="Marketing Objectives" section="objectives" />
          <MarketingObjectives objectives={marketingObjectives} />
        </div>

        {/* Campaign Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <SectionHeader title="Campaign Timeline" section="timeline" />
          <CampaignTimeline timeline={timeline} />
        </div>

        {/* Campaign Proposals */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <SectionHeader title="Marketing Campaigns" section="campaigns" />
          <CampaignProposals campaigns={campaignProposals} />
        </div>

        {/* Content Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <SectionHeader title="Content Calendar" section="calendar" />
          <p className="text-gray-500 mb-6">Strategic content schedule for your marketing campaigns</p>
          <ContentCalendar isFullCalendar={true} />
        </div>
      </div>

      {showFeedbackModal && <FeedbackModal />}
    </div>
  );
}

export default AIMarketingStrategy;