import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, BarChart3, Users, ArrowRight, Filter, Instagram, Twitter, Facebook, Globe, Target, Clock, MessageSquare, Sparkles, Search, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  dateRange: string;
  status: 'active' | 'draft' | 'completed' | 'scheduled';
  stats: {
    posts: number;
    scheduled: number;
    engagement: string;
    reach: string;
  };
  progress?: number;
}

function Campaigns() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock campaign data
  const [campaigns] = useState<Campaign[]>([
    {
      id: 'q2-growth',
      name: 'Q2 Growth Campaign',
      dateRange: 'Apr 1 - Jun 30, 2024',
      status: 'active',
      stats: {
        posts: 45,
        scheduled: 8,
        engagement: '5.2%',
        reach: '850K'
      },
      progress: 65
    },
    {
      id: 'product-launch',
      name: 'Product Launch 2024',
      dateRange: 'Mar 15 - Apr 15, 2024',
      status: 'scheduled',
      stats: {
        posts: 28,
        scheduled: 4,
        engagement: '6.1%',
        reach: '420K'
      },
      progress: 40
    },
    {
      id: 'brand-awareness',
      name: 'Brand Awareness',
      dateRange: 'Jan 1 - Dec 31, 2024',
      status: 'completed',
      stats: {
        posts: 83,
        scheduled: 0,
        engagement: '4.2%',
        reach: '1.1M'
      },
      progress: 100
    }
  ]);

  const timelineMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  const campaignTimeline = campaigns.map(campaign => {
    const [startStr, endStr] = campaign.dateRange.split(' - ');
    const startDate = new Date(startStr);
    const endDate = endStr ? new Date(endStr) : new Date(new Date().getFullYear(), 11, 31);
    
    return {
      ...campaign,
      startMonth: startDate.getMonth(),
      endMonth: endDate.getMonth(),
      startYear: startDate.getFullYear(),
      endYear: endDate.getFullYear()
    };
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCampaign = () => {
    try {
      setError(null);
      navigate('/create', { 
        state: { 
          type: 'campaign',
          source: 'campaigns'
        }
      });
    } catch (error) {
      setError('Failed to navigate to campaign creation. Please try again.');
    }
  };

  const handleCampaignClick = (campaignId: string) => {
    try {
      setError(null);
      navigate(`/campaigns/${campaignId}`);
    } catch (error) {
      setError('Failed to open campaign details. Please try again.');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500">Manage and track your marketing campaigns</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <button
            onClick={handleCreateCampaign}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Campaign Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => handleCampaignClick(campaign.id)}
            className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-500">{campaign.dateRange}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : campaign.status === 'completed'
                    ? 'bg-gray-100 text-gray-700'
                    : campaign.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {campaign.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Posts</p>
                <p className="text-lg font-semibold text-gray-900">{campaign.stats.posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-lg font-semibold text-gray-900">{campaign.stats.scheduled}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="text-lg font-semibold text-gray-900">{campaign.stats.engagement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reach</p>
                <p className="text-lg font-semibold text-gray-900">{campaign.stats.reach}</p>
              </div>
            </div>

            {campaign.progress !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Campaign Progress</span>
                  <span className="text-sm font-medium text-gray-900">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Campaign Timeline */}
      <div className="mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Timeline</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-600">2024</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Month Headers */}
            <div className="grid grid-cols-12 mb-4">
              {timelineMonths.map((month, index) => (
                <div
                  key={month}
                  className={`text-center text-sm font-medium ${
                    index === currentMonth ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Timeline Grid */}
            <div className="space-y-4">
              {campaignTimeline.map((campaign) => (
                <div key={campaign.id} className="relative">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-medium text-gray-900 w-48 truncate">
                      {campaign.name}
                    </span>
                    <div className="flex-1 grid grid-cols-12 gap-0">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <div
                          key={index}
                          className={`h-8 border-r border-gray-100 relative ${
                            index === currentMonth ? 'bg-blue-50' : ''
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
                              } left-0 right-0 mx-1`}
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
                left: `${(currentMonth / 12) * 100}%`,
                transform: 'translateX(-50%)'
              }}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-500">
            {searchQuery
              ? `No campaigns match "${searchQuery}"`
              : 'Get started by creating your first campaign'}
          </p>
          <button
            onClick={handleCreateCampaign}
            disabled={isLoading}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
}

export default Campaigns;