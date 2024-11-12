import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Target, MessageCircle, Sparkles, Send, ArrowLeft, AlertCircle, Copy, Instagram, Twitter, Facebook, Wand2, Hash, Globe, RefreshCw, Lightbulb, TrendingUp, ChevronRight, X, Users, Calendar, CheckCircle, Eye, Megaphone, Book, Search } from 'lucide-react';
import { useCampaignGenerator } from './hooks/useCampaignGenerator';
import { GeneratedCampaign } from './types';

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: 'article' | 'guide' | 'policy' | 'template';
  documentCount: number;
  lastUpdated: string;
}

function WritezAICampaignCreator({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const { generateCampaign, isGenerating } = useCampaignGenerator();
  const [objectives, setObjectives] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showKnowledgeBaseModal, setShowKnowledgeBaseModal] = useState(false);
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock knowledge bases data
  const knowledgeBases: KnowledgeBase[] = [
    {
      id: 'company-info',
      name: 'Company Information',
      description: 'Core company information, values, and messaging',
      type: 'article',
      documentCount: 15,
      lastUpdated: '2024-03-15'
    },
    {
      id: 'market-research',
      name: 'Market Research',
      description: 'Industry trends and competitive analysis',
      type: 'guide',
      documentCount: 23,
      lastUpdated: '2024-03-14'
    },
    {
      id: 'brand-guidelines',
      name: 'Brand Guidelines',
      description: 'Brand voice, style, and visual guidelines',
      type: 'policy',
      documentCount: 8,
      lastUpdated: '2024-03-13'
    },
    {
      id: 'campaign-templates',
      name: 'Campaign Templates',
      description: 'Previous successful campaign strategies',
      type: 'template',
      documentCount: 12,
      lastUpdated: '2024-03-12'
    }
  ];

  const filteredKnowledgeBases = knowledgeBases.filter(kb =>
    kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateCampaign = async () => {
    try {
      const campaign = await generateCampaign(objectives, selectedPlatforms);
      setGeneratedCampaign(campaign);
    } catch (error) {
      console.error('Failed to generate campaign:', error);
    }
  };

  const handleSaveCampaign = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/campaigns');
    }, 1500);
  };

  const LiveInsightsPanel = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Live AI Insights</h2>
            <p className="text-sm text-gray-500">Real-time campaign recommendations</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium text-gray-900">Trending Topics</h3>
          </div>
          <p className="text-sm text-gray-600">AI and automation discussion spiking in your industry</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <h3 className="font-medium text-gray-900">Audience Insights</h3>
          </div>
          <p className="text-sm text-gray-600">Tech decision-makers most active 9-11 AM EST</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-600" />
            <h3 className="font-medium text-gray-900">Performance Prediction</h3>
          </div>
          <p className="text-sm text-gray-600">Video content likely to drive 2.5x more engagement</p>
        </div>
      </div>
    </div>
  );

  const KnowledgeBaseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Campaign Knowledge Base</h3>
                <p className="text-sm text-gray-500">Select sources for campaign strategy generation</p>
              </div>
            </div>
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search knowledge bases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredKnowledgeBases.map((kb) => (
              <label
                key={kb.id}
                className="flex items-start p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50"
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={selectedKnowledgeBases.includes(kb.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedKnowledgeBases([...selectedKnowledgeBases, kb.id]);
                      } else {
                        setSelectedKnowledgeBases(selectedKnowledgeBases.filter(id => id !== kb.id));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{kb.name}</p>
                      <p className="text-sm text-gray-500">{kb.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {kb.documentCount} documents
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {kb.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated {kb.lastUpdated}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowKnowledgeBaseModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign Created!</h3>
        <p className="text-gray-500">Your campaign has been added to the dashboard</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">AI Campaign Strategist</h1>
          <p className="text-gray-500">Create a comprehensive marketing campaign strategy</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Strategy Input Section */}
          <div className="space-y-6">
            <LiveInsightsPanel />
            
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Campaign Strategy</h2>
                  <p className="text-sm text-gray-500">Define your campaign objectives</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Knowledge Base Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Knowledge Base
                  </label>
                  <button
                    onClick={() => setShowKnowledgeBaseModal(true)}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedKnowledgeBases.length
                          ? `${selectedKnowledgeBases.length} sources selected`
                          : 'Select campaign knowledge sources'}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Campaign Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Objectives
                  </label>
                  <textarea
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your campaign goals and objectives..."
                  />
                </div>

                {/* Platforms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Platforms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPlatforms(prev => 
                        prev.includes('instagram') 
                          ? prev.filter(p => p !== 'instagram')
                          : [...prev, 'instagram']
                      )}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                        selectedPlatforms.includes('instagram')
                          ? 'border-pink-200 bg-pink-50 text-pink-600'
                          : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm">Instagram</span>
                    </button>
                    <button
                      onClick={() => setSelectedPlatforms(prev => 
                        prev.includes('twitter') 
                          ? prev.filter(p => p !== 'twitter')
                          : [...prev, 'twitter']
                      )}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                        selectedPlatforms.includes('twitter')
                          ? 'border-blue-200 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={() => setSelectedPlatforms(prev => 
                        prev.includes('facebook') 
                          ? prev.filter(p => p !== 'facebook')
                          : [...prev, 'facebook']
                      )}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                        selectedPlatforms.includes('facebook')
                          ? 'border-blue-200 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <Facebook className="w-4 h-4" />
                      <span className="text-sm">Facebook</span>
                    </button>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateCampaign}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Strategy...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Campaign Strategy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {generatedCampaign ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Megaphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{generatedCampaign.name}</h2>
                      <p className="text-sm text-gray-500">{generatedCampaign.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSaveCampaign}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Calendar className="w-4 h-4" />
                    Create Campaign
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Campaign Phases */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Campaign Phases</h3>
                    {generatedCampaign.phases.map((phase, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{phase.name}</h4>
                          <span className="text-sm text-gray-500">{phase.duration}</span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-600 mb-3">
                          {phase.objectives.map((objective, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Budget Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Budget Allocation</h3>
                      <div className="space-y-2">
                        {Object.entries(generatedCampaign.budget.allocation).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 capitalize">{key}</span>
                            <span className="text-sm font-medium text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">ROI Projection</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Projected ROI</span>
                          <span className="text-sm font-medium text-green-600">
                            {generatedCampaign.budget.roi.projected}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Key Performance Indicators</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {generatedCampaign.performance.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {metric.current} / {metric.target}
                            </span>
                            {metric.trend === 'up' && (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col items-center justify-center h-[600px] text-gray-400">
                  <Megaphone className="w-12 h-12 mb-4" />
                  <p className="text-lg">Campaign preview will appear here</p>
                  <p className="text-sm mt-2">Generate a campaign strategy to see the details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showKnowledgeBaseModal && <KnowledgeBaseModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}

export default WritezAICampaignCreator;