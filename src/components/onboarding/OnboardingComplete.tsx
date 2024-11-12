import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Rocket, Calendar, Target, BarChart3, MessageSquare, Users, ArrowRight, Sparkles, Clock, Globe, Layout } from 'lucide-react';

function OnboardingComplete() {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  // Generate sample content ideas based on company profile and preferences
  const contentIdeas = [
    {
      type: 'video',
      title: 'Product Feature Showcase',
      description: `Highlighting ${onboardingData.companyProfile?.name}'s unique features`,
      platform: 'instagram',
      estimatedEngagement: '4.8%'
    },
    {
      type: 'article',
      title: 'Industry Insights',
      description: 'Thought leadership content based on market trends',
      platform: 'linkedin',
      estimatedEngagement: '3.2%'
    },
    {
      type: 'carousel',
      title: 'Customer Success Story',
      description: 'Visual storytelling of client achievements',
      platform: 'instagram',
      estimatedEngagement: '5.1%'
    }
  ];

  // Generate campaign suggestions
  const campaignSuggestions = [
    {
      name: 'Brand Awareness Campaign',
      duration: '3 months',
      channels: ['Instagram', 'LinkedIn', 'Twitter'],
      objectives: [
        'Increase brand visibility by 50%',
        'Generate 1000+ qualified leads',
        'Boost engagement rate to 4.5%'
      ]
    },
    {
      name: 'Product Launch Series',
      duration: '6 weeks',
      channels: ['Instagram', 'Facebook', 'LinkedIn'],
      objectives: [
        'Drive 10,000+ website visits',
        'Achieve 25% engagement rate',
        'Generate 500+ demo requests'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Layout className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Marketing Command Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've analyzed your preferences and created a personalized marketing strategy for {onboardingData.companyProfile?.name}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/create')}
                className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="font-medium">Create Content</span>
                </div>
                <p className="text-sm text-white/90">Start creating your first post</p>
              </button>

              <button
                onClick={() => navigate('/calendar')}
                className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="font-medium">View Calendar</span>
                </div>
                <p className="text-sm text-white/90">See your content schedule</p>
              </button>

              <button
                onClick={() => navigate('/campaigns')}
                className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="font-medium">Launch Campaign</span>
                </div>
                <p className="text-sm text-white/90">Start your first campaign</p>
              </button>
            </div>

            {/* Content Ideas */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">AI-Generated Content Ideas</h2>
                    <p className="text-sm text-gray-500">Based on your brand voice and preferences</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/create')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Create Content
                </button>
              </div>

              <div className="space-y-4">
                {contentIdeas.map((idea, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{idea.title}</h3>
                      <span className="text-sm text-gray-500">{idea.platform}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Type: {idea.type}</span>
                      <span className="text-green-600">Est. Engagement: {idea.estimatedEngagement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Suggestions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Recommended Campaigns</h2>
                    <p className="text-sm text-gray-500">Tailored to your marketing goals</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/campaigns')}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  View Campaigns
                </button>
              </div>

              <div className="space-y-4">
                {campaignSuggestions.map((campaign, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500">Duration: {campaign.duration}</p>
                      </div>
                      <div className="flex gap-2">
                        {campaign.channels.map((channel) => (
                          <span 
                            key={channel}
                            className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {campaign.objectives.map((objective, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                          {objective}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Brand Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Brand Overview</h2>
                  <p className="text-sm text-gray-500">Your brand identity</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Brand Voice</h3>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.brandVoice?.personality.traits.map((trait, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    {onboardingData.targetAudience?.demographics.industries.map((industry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        {industry}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Projected Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Engagement Rate</span>
                    <span className="text-sm font-medium text-gray-900">4.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Brand Awareness</span>
                    <span className="text-sm font-medium text-gray-900">+45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Lead Generation</span>
                    <span className="text-sm font-medium text-gray-900">+32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/create')}
                  className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  <span>Create your first post</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/campaigns')}
                  className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  <span>Set up a campaign</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/calendar')}
                  className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  <span>Plan your content calendar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingComplete;