import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, BarChart3, Users, ArrowLeft, Plus, Filter, Instagram, Twitter, Facebook, Globe, Target, Clock, MessageSquare, Zap, TrendingUp, AlertCircle, ChevronRight, Search, ArrowUp, ArrowDown, Hash, Sparkles } from 'lucide-react';

function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock campaign data
  const campaign = {
    id,
    name: 'Q2 Growth Campaign',
    dateRange: 'Apr 1 - Jun 30, 2024',
    status: 'active',
    progress: 65,
    description: 'Focused campaign to drive Q2 growth through product awareness and lead generation.',
    objectives: [
      'Increase product awareness by 50%',
      'Generate 1000+ qualified leads',
      'Achieve 25% engagement rate'
    ],
    stats: {
      reach: '850K',
      engagement: '5.2%',
      leads: '458',
      conversion: '3.8%'
    },
    upcomingContent: [
      {
        id: 1,
        title: 'Product Demo Video',
        description: 'Showcase new features and benefits',
        platform: 'instagram',
        date: 'Tomorrow, 10:00 AM',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ],
    publishedContent: [
      {
        id: 2,
        title: 'Customer Success Story',
        description: 'How Company X achieved 200% growth',
        platform: 'linkedin',
        date: 'Mar 15, 2:00 PM',
        status: 'published',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        stats: {
          impressions: '12.5K',
          clicks: 450,
          shares: 89
        }
      }
    ],
    targetAudience: {
      demographics: [
        'Tech Professionals (25-45)',
        'Decision Makers',
        'IT Managers'
      ],
      interests: [
        'Cloud Computing',
        'Digital Transformation',
        'Enterprise Software',
        'Tech Innovation'
      ],
      locations: [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia'
      ]
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      default:
        return <Globe className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content' },
    { id: 'insights', label: 'Insights' }
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Campaign Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Campaign Overview</h2>
                  <p className="text-sm text-gray-500">{campaign.dateRange}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Progress</span>
                    <span className="font-medium text-gray-900">{campaign.progress}%</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{campaign.description}</p>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Campaign Objectives</h3>
                <ul className="space-y-2">
                  {campaign.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Reach</p>
                    <p className="text-xl font-semibold text-gray-900">{campaign.stats.reach}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{campaign.stats.engagement}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Leads Generated</p>
                    <p className="text-xl font-semibold text-gray-900">{campaign.stats.leads}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{campaign.stats.conversion}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Content Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Content</h2>
                <button 
                  onClick={() => setSelectedTab('content')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All Content
                </button>
              </div>

              <div className="space-y-4">
                {campaign.upcomingContent.map((content) => (
                  <div key={content.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    {content.image && (
                      <img
                        src={content.image}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{content.title}</h3>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {content.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(content.platform)}
                          <span className="capitalize">{content.platform}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{content.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Target Audience</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Demographics</h3>
                  <div className="space-y-3">
                    {campaign.targetAudience.demographics.map((demo, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">{demo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaign.targetAudience.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Locations</h3>
                  <div className="space-y-3">
                    {campaign.targetAudience.locations.map((location, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">{location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'content':
        return (
          <div className="space-y-6">
            {/* Content Calendar Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Content Calendar</h2>
                <button 
                  onClick={() => navigate(`/calendar/${campaign.id}`)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  View Full Calendar
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid Preview (just showing one week) */}
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="aspect-square p-2 border border-gray-100 rounded-lg">
                    <span className="text-sm text-gray-600">{i + 15}</span>
                    {i === 1 && (
                      <div className="mt-1 p-1 bg-blue-100 rounded text-xs text-blue-700">
                        2 posts
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Performance */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Top Performing</h3>
                    <p className="text-sm text-gray-500">Product Demo Video</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>8.5k engagements</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Hash className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Top Hashtag</h3>
                    <p className="text-sm text-gray-500">#TechInnovation</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>45% engagement rate</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <Clock className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Best Time</h3>
                    <p className="text-sm text-gray-500">2-4 PM Weekdays</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>32% higher engagement</span>
                </div>
              </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Campaign Content</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search content..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    New Content
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {campaign.upcomingContent.concat(campaign.publishedContent).map((content) => (
                  <div key={content.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    {content.image && (
                      <img
                        src={content.image}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{content.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          content.status === 'scheduled'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {content.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(content.platform)}
                            <span className="capitalize">{content.platform}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{content.date}</span>
                          </div>
                        </div>
                        {content.stats && (
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{content.stats.impressions} impressions</span>
                            <span>{content.stats.clicks} clicks</span>
                            <span>{content.stats.shares} shares</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'insights':
        return (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Reach</p>
                    <p className="text-xl font-semibold text-gray-900">850K</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>+15.8% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="text-xl font-semibold text-gray-900">5.2%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>+2.3% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="text-xl font-semibold text-gray-900">2.1K</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>+18.2% from last month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-xl font-semibold text-gray-900">3.8%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>+5.2% from last month</span>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Content Analysis</h2>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Top Performing Content Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Video Content</span>
                        <span className="text-sm font-medium text-gray-900">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Image Posts</span>
                        <span className="text-sm font-medium text-gray-900">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Content Recommendations</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-600" />
                        Increase video content production
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-green-600" />
                        Focus on technical tutorials
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowDown className="w-4 h-4 text-red-600" />
                        Reduce promotional content
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Audience Insights</h2>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Demographics</h3>
                    <div className="space-y-4">
                      {campaign.targetAudience.demographics.map((demo, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-600">{demo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Top Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {campaign.targetAudience.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Geographic Distribution</h3>
                    <div className="space-y-2">
                      {campaign.targetAudience.locations.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{location}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {Math.floor(Math.random() * 20 + 20)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-semibold">AI Recommendations</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Content Strategy</h3>
                  <p className="text-sm opacity-90">
                    Increase video content production by 30% to maximize engagement
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Timing</h3>
                  <p className="text-sm opacity-90">
                    Schedule posts between 2-4 PM for optimal reach
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Audience</h3>
                  <p className="text-sm opacity-90">
                    Focus on tech professionals in US and UK markets
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/campaigns')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="text-gray-500">{campaign.dateRange}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Create Content
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
              selectedTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
}

export default CampaignDetail;