import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingData } from '../../../types/onboarding';
import CompanyOverview from './CompanyOverview';
import CampaignProposals from './CampaignProposals';
import MarketingObjectives from './MarketingObjectives';
import CampaignTimeline from './CampaignTimeline';
import ContentCalendar from '../../ContentCalendar';
import { Layout, CheckCircle, XCircle, Edit2, Download, Send, AlertCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface AIAnalysisResultsProps {
  onboardingData: OnboardingData;
}

interface SectionStatus {
  companyProfile: 'pending' | 'approved' | 'changes';
  objectives: 'pending' | 'approved' | 'changes';
  campaigns: 'pending' | 'approved' | 'changes';
  timeline: 'pending' | 'approved' | 'changes';
  calendar: 'pending' | 'approved' | 'changes';
}

const sections = [
  { id: 'companyProfile', title: 'Company Profile', summary: 'Overview of your business and market position' },
  { id: 'objectives', title: 'Marketing Objectives', summary: 'Strategic goals and KPIs' },
  { id: 'campaigns', title: 'Marketing Campaigns', summary: 'Planned marketing initiatives' },
  { id: 'timeline', title: 'Campaign Timeline', summary: 'Implementation schedule and milestones' },
  { id: 'calendar', title: 'Content Calendar', summary: 'Content planning and scheduling' }
];

function AIAnalysisResults({ onboardingData }: AIAnalysisResultsProps) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
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

  const handleApproveAll = () => {
    const newStatus = Object.keys(sectionStatus).reduce((acc, key) => ({
      ...acc,
      [key]: 'approved'
    }), {} as SectionStatus);
    
    setSectionStatus(newStatus);
    
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 500);
  };

  const handlePrevSection = () => {
    setCurrentSection(prev => Math.max(0, prev - 1));
  };

  const handleNextSection = () => {
    setCurrentSection(prev => Math.min(sections.length - 1, prev + 1));
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
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{sections.find(s => s.id === section)?.summary}</p>
      </div>
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

  const renderSection = (section: string) => {
    switch (section) {
      case 'companyProfile':
        return <CompanyOverview 
          companyInfo={onboardingData.companyProfile}
          onEdit={() => handleStatusChange('companyProfile', 'changes')}
        />;
      case 'objectives':
        return <MarketingObjectives objectives={onboardingData.marketingGoals?.objectives || []} />;
      case 'campaigns':
        return <CampaignProposals campaigns={[]} />;
      case 'timeline':
        return <CampaignTimeline timeline={onboardingData.marketingGoals?.timeline} />;
      case 'calendar':
        return (
          <>
            <p className="text-gray-500 mb-6">Strategic content schedule for your marketing campaigns</p>
            <ContentCalendar isFullCalendar={true} />
          </>
        );
      default:
        return null;
    }
  };

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
                onClick={handleApproveAll}
                disabled={allSectionsApproved}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {allSectionsApproved ? 'Strategy Approved' : 'Approve All Sections'}
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSection === index 
                    ? 'bg-blue-600 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handlePrevSection}
              disabled={currentSection === 0}
              className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handleNextSection}
              disabled={currentSection === sections.length - 1}
              className="p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Section Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <SectionHeader 
              title={sections[currentSection].title} 
              section={sections[currentSection].id as keyof SectionStatus} 
            />
            {renderSection(sections[currentSection].id)}
          </div>
        </div>
      </div>

      {showFeedbackModal && <FeedbackModal />}
    </div>
  );
}

export default AIAnalysisResults;