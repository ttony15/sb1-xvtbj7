import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, BarChart3, Users, ArrowRight, Filter, Instagram, Twitter, Facebook, Globe, Target, Clock, MessageSquare, Search, ArrowUp, ArrowDown, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import ContentPreview from './ContentPreview';
import LiveAIInsights from './insights/LiveAIInsights';

function CommandCenter() {
  const navigate = useNavigate();

  const handleMetricClick = (platform: string, metric: string) => {
    switch (metric) {
      case 'followers':
        navigate(`/analytics/audience?platform=${platform}`);
        break;
      case 'messages':
        navigate(`/social?platform=${platform}&tab=messages`);
        break;
      case 'leads':
        navigate(`/analytics/leads?platform=${platform}`);
        break;
      case 'engagement':
        navigate(`/analytics/engagement?platform=${platform}`);
        break;
      default:
        navigate(`/analytics?platform=${platform}`);
    }
  };

  const handleFilterClick = () => {
    // This would typically open a filter modal or dropdown
    console.log('Opening filter options...');
  };

  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // This would typically show search suggestions
    console.log('Search focused...');
  };

  // Rest of your existing data...
  const recentPost = {
    id: '1',
    platform: 'instagram',
    content: '🚀 Exciting news! Get ready for our biggest product launch yet. Stay tuned for something that will revolutionize your workflow.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    publishedAt: '2 hours ago',
    metrics: {
      engagement: '4.8%',
      reach: '12.5K',
      sentiment: 85,
      likes: 423,
      comments: 48,
      shares: 32,
      trend: 'up'
    }
  };

  const upcomingPosts = [
    {
      id: '2',
      platform: 'instagram',
      title: 'Product Launch Announcement',
      time: '2:00 PM',
      date: 'Today',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      platform: 'twitter',
      title: 'Tech Talk Series #3',
      time: '10:00 AM',
      date: 'Tomorrow'
    },
    {
      id: '4',
      platform: 'facebook',
      title: 'Customer Success Story',
      time: '3:00 PM',
      date: 'Fri, 18',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const platformMetrics = [
    {
      platform: 'instagram',
      icon: Instagram,
      color: 'pink',
      metrics: {
        followers: '12.5K',
        growth: '+2.4%',
        messages: '156',
        leads: '45',
        engagement: '4.8%'
      }
    },
    {
      platform: 'twitter',
      icon: Twitter,
      color: 'blue',
      metrics: {
        followers: '8.2K',
        growth: '+1.8%',
        messages: '98',
        leads: '32',
        engagement: '3.2%'
      }
    },
    {
      platform: 'facebook',
      icon: Facebook,
      color: 'blue',
      metrics: {
        followers: '15.3K',
        growth: '-0.5%',
        messages: '245',
        leads: '78',
        engagement: '2.9%'
      }
    }
  ];

  const campaignTimeline = {
    currentMonth: new Date().getMonth(),
    campaigns: [
      {
        id: 'q2-growth',
        name: 'Q2 Growth Campaign',
        startMonth: 3,
        endMonth: 5,
        status: 'active',
        progress: 65
      },
      {
        id: 'product-launch',
        name: 'Product Launch 2024',
        startMonth: 2,
        endMonth: 3,
        status: 'scheduled',
        progress: 40
      }
    ]
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
          <p className="text-gray-500">Your marketing overview</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={handleSearchFocus}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => navigate('/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/create')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-medium">New Post</span>
                </div>
                <p className="text-sm text-white/80">Create new content</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            <button
              onClick={() => navigate('/calendar')}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
            >
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Calendar</span>
                </div>
                <p className="text-sm text-white/80">View schedule</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
            >
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Analytics</span>
                </div>
                <p className="text-sm text-white/80">View insights</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Content Preview */}
          <ContentPreview recentPost={recentPost} upcomingPosts={upcomingPosts} />

          {/* Campaign Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Campaign Timeline</h2>
                  <p className="text-sm text-gray-500">Active marketing campaigns</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/campaigns')}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
              >
                View All Campaigns
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              {/* Month Headers */}
              <div className="grid grid-cols-12 mb-4">
                {months.map((month, index) => (
                  <div
                    key={month}
                    className={`text-center text-sm font-medium cursor-pointer hover:text-blue-700 transition-colors ${
                      index === campaignTimeline.currentMonth ? 'text-blue-600' : 'text-gray-500'
                    }`}
                    onClick={() => navigate(`/calendar/${index + 1}`)}
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* Timeline Grid */}
              <div className="space-y-4">
                {campaignTimeline.campaigns.map((campaign) => (
                  <div 
                    key={campaign.id}
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                    className="relative cursor-pointer group hover:bg-gray-50 rounded-lg transition-colors p-2"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium text-gray-900 w-48 truncate group-hover:text-blue-600 transition-colors">
                        {campaign.name}
                      </span>
                      <div className="flex-1 grid grid-cols-12 gap-0">
                        {Array.from({ length: 12 }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-8 border-r border-gray-100 relative ${
                              index === campaignTimeline.currentMonth ? 'bg-blue-50' : ''
                            }`}
                          >
                            {index >= campaign.startMonth && 
                             index <= campaign.endMonth && (
                              <div
                                className={`absolute top-1/2 -translate-y-1/2 h-3 ${
                                  campaign.status === 'active'
                                    ? 'bg-green-500'
                                    : campaign.status === 'completed'
                                    ? 'bg-gray-300'
                                    : 'bg-blue-400'
                                } ${
                                  index === campaign.startMonth
                                    ? 'rounded-l-full ml-0'
                                    : index === campaign.endMonth
                                    ? 'rounded-r-full mr-0'
                                    : ''
                                } left-0 right-0 mx-1 group-hover:opacity-80 transition-opacity`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="w-24 flex justify-end">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            campaign.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : campaign.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Month Indicator */}
              <div
                className="absolute top-0 bottom-0 w-px bg-blue-500"
                style={{
                  left: `${(campaignTimeline.currentMonth / 12) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* AI Insights */}
          <LiveAIInsights />

          {/* Platform Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Platform Overview</h2>
              <button
                onClick={handleFilterClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              {platformMetrics.map((platform) => (
                <div 
                  key={platform.platform} 
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/analytics?platform=${platform.platform}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <platform.icon className={`w-5 h-5 ${
                        platform.platform === 'instagram' ? 'text-pink-600' :
                        platform.platform === 'twitter' ? 'text-blue-400' :
                        'text-blue-600'
                      }`} />
                      <span className="font-medium text-gray-900 capitalize">{platform.platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        platform.metrics.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.metrics.growth}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(platform.metrics).map(([key, value]) => {
                      if (key === 'growth') return null;
                      return (
                        <div
                          key={key}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMetricClick(platform.platform, key);
                          }}
                          className="cursor-pointer hover:bg-white rounded-lg p-2 transition-colors"
                        >
                          <p className="text-sm text-gray-500 mb-1 capitalize">{key}</p>
                          <p className="font-medium text-gray-900">{value}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">30-day Performance</span>
                      <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            platform.platform === 'instagram' ? 'bg-pink-600' :
                            platform.platform === 'twitter' ? 'bg-blue-400' :
                            'bg-blue-600'
                          }`}
                          style={{ 
                            width: `${parseFloat(platform.metrics.engagement) * 20}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/analytics')}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Analytics
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommandCenter;