import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, ArrowUp, ArrowDown, Heart,
  MessageCircle, Share2, Target, Zap, Calendar, Filter,
  ChevronDown, Globe, Search, Image, Video, FileText, ExternalLink
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Analytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedView, setSelectedView] = useState('overview');

  const performanceMetrics = [
    {
      platform: 'Instagram',
      metrics: {
        followers: '45.2K',
        engagement: '4.8%',
        growth: '+2.3%',
        sentiment: '92%'
      },
      trend: 'up',
      color: 'bg-gradient-to-r from-pink-500 to-purple-500'
    },
    {
      platform: 'Twitter',
      metrics: {
        followers: '28.1K',
        engagement: '3.2%',
        growth: '+1.7%',
        sentiment: '85%'
      },
      trend: 'up',
      color: 'bg-gradient-to-r from-blue-400 to-blue-500'
    },
    {
      platform: 'Facebook',
      metrics: {
        followers: '32.5K',
        engagement: '2.9%',
        growth: '-0.5%',
        sentiment: '78%'
      },
      trend: 'down',
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    }
  ];

  const topPosts = [
    {
      id: '1',
      title: 'Product Launch Announcement',
      type: 'image',
      platform: 'instagram',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stats: {
        reach: '125K',
        engagement: '8.5%',
        likes: 4521,
        comments: 342,
        shares: 156
      }
    },
    {
      id: '2',
      title: 'Tech Tutorial Series',
      type: 'video',
      platform: 'facebook',
      date: '2024-03-14',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      stats: {
        reach: '98K',
        engagement: '6.2%',
        likes: 3254,
        comments: 245,
        shares: 423
      }
    },
    {
      id: '3',
      title: 'Industry Insights Thread',
      type: 'text',
      platform: 'twitter',
      date: '2024-03-13',
      stats: {
        reach: '45K',
        engagement: '4.8%',
        likes: 1245,
        comments: 156,
        shares: 892
      }
    }
  ];

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Instagram',
        data: [4.2, 4.4, 4.8, 4.6, 5.0, 4.8],
        borderColor: 'rgb(219, 39, 119)',
        backgroundColor: 'rgba(219, 39, 119, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Twitter',
        data: [3.0, 3.2, 3.1, 3.3, 3.2, 3.4],
        borderColor: 'rgb(29, 161, 242)',
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Facebook',
        data: [2.8, 2.9, 2.7, 2.8, 2.9, 3.0],
        borderColor: 'rgb(66, 103, 178)',
        backgroundColor: 'rgba(66, 103, 178, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const reachData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reach',
        data: [65000, 72000, 68000, 85000, 78000, 55000, 50000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }
    ]
  };

  const audienceGrowth = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'New Followers',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200 + 100)),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const contentPerformance = [
    {
      type: 'Video',
      engagement: 78,
      reach: '125K',
      trend: 'up',
      growth: '+15%'
    },
    {
      type: 'Image',
      engagement: 65,
      reach: '98K',
      trend: 'up',
      growth: '+8%'
    },
    {
      type: 'Text',
      engagement: 45,
      reach: '52K',
      trend: 'down',
      growth: '-3%'
    }
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-pink-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderOverview = () => (
    <>
      {/* Platform Performance */}
      <div className="grid grid-cols-3 gap-6">
        {performanceMetrics.map((platform) => (
          <div key={platform.platform} className={`${platform.color} text-white rounded-xl p-6`}>
            <h3 className="text-lg font-semibold mb-4">{platform.platform}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-90">Followers</p>
                <p className="text-2xl font-bold">{platform.metrics.followers}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Engagement</p>
                <p className="text-2xl font-bold">{platform.metrics.engagement}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Growth</p>
                <div className="flex items-center gap-1">
                  {platform.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-lg font-semibold">{platform.metrics.growth}</span>
                </div>
              </div>
              <div>
                <p className="text-sm opacity-90">Sentiment</p>
                <p className="text-lg font-semibold">{platform.metrics.sentiment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Chart */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Rate</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">by Platform</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <Line data={engagementData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Reach</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Last 7 days</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <Bar data={reachData} options={chartOptions} />
        </div>
      </div>

      {/* Audience Growth */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Audience Growth</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Last 30 days</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <Line data={audienceGrowth} options={chartOptions} />
      </div>

      {/* Content Performance */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Content Performance</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {contentPerformance.map((content) => (
            <div key={content.type} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{content.type} Content</h4>
                <span className={`flex items-center gap-1 text-sm ${
                  content.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {content.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {content.growth}
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Engagement</span>
                    <span className="text-sm font-medium text-gray-900">{content.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${content.engagement}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Reach</span>
                  <span className="font-medium text-gray-900">{content.reach}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {topPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {post.image && (
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                    {post.platform}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getPostTypeIcon(post.type)}
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Reach</p>
                  <p className="text-lg font-semibold text-gray-900">{post.stats.reach}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engagement</p>
                  <p className="text-lg font-semibold text-gray-900">{post.stats.engagement}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.stats.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span>{post.stats.shares}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts Performance</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <select className="border border-gray-200 rounded-lg text-sm px-3 py-2">
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="text">Text</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 font-medium text-gray-500">Post</th>
                <th className="pb-3 font-medium text-gray-500">Type</th>
                <th className="pb-3 font-medium text-gray-500">Platform</th>
                <th className="pb-3 font-medium text-gray-500">Date</th>
                <th className="pb-3 font-medium text-gray-500">Reach</th>
                <th className="pb-3 font-medium text-gray-500">Engagement</th>
                <th className="pb-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {post.image && (
                        <img
                          src={post.image}
                          alt=""
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-900">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getPostTypeIcon(post.type)}
                      <span className="capitalize">{post.type}</span>
                    </div>
                  </td>
                  <td className="py-4 capitalize">{post.platform}</td>
                  <td className="py-4">{post.date}</td>
                  <td className="py-4">{post.stats.reach}</td>
                  <td className="py-4">{post.stats.engagement}</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your social media performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedView === 'overview'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView('posts')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedView === 'posts'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm text-gray-600 border-none focus:ring-0"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <Globe className="w-4 h-4 text-gray-500" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="text-sm text-gray-600 border-none focus:ring-0"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {selectedView === 'overview' ? renderOverview() : renderPosts()}
      </div>
    </div>
  );
}

export default Analytics;