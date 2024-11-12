import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, TrendingUp, Target, Users, ArrowUp, Brain, MessageSquare, 
  Send, Rocket, Zap, BarChart3, Globe, Search, Clock, AlertCircle, 
  ChevronRight, ChevronDown, ArrowDown, Gauge, LineChart, PieChart, 
  Activity, Eye, Video, FileText
} from 'lucide-react';
import AIPerformanceAnalysis from './AIPerformanceAnalysis';

function AIInsights() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const tabs = [
    { id: 'live', label: 'Live Insights' },
    { id: 'historical', label: 'Historical' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Marketing Insights</h1>
          <p className="text-gray-500">Real-time analysis and recommendations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'live'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Live Insights
            </button>
            <button
              onClick={() => setActiveTab('historical')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'historical'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Historical
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Brain className="w-4 h-4" />
            New Analysis
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          {/* Live Insights Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  High Priority
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Engagement Spike</h3>
              <p className="text-sm text-gray-600 mb-3">
                Video content is driving 2.5x more engagement than other formats.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last 24 hours</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>32% increase</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  Insight
                </span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Optimal Posting Time</h3>
              <p className="text-sm text-gray-600 mb-3">
                Best engagement window: 9:00 AM - 11:00 AM EST
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Based on last 30 days</span>
                <div className="flex items-center gap-1 text-blue-600">
                  <Activity className="w-4 h-4" />
                  <span>45% higher engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Performance Analysis */}
          <AIPerformanceAnalysis />

          {/* Strategic Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Strategic Insights</h2>
                  <p className="text-sm text-gray-500">AI-powered recommendations</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Audience Growth</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Technical content is attracting more senior decision-makers.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <ArrowUp className="w-4 h-4" />
                  <span>28% increase in CTO-level engagement</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Content Strategy</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  How-to guides and tutorials are driving highest engagement.
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>3.2x higher conversion rate</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4 text-orange-600" />
                  <h3 className="font-medium text-gray-900">Growth Opportunities</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Expanding into developer education content could unlock new audience.
                </p>
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Target className="w-4 h-4" />
                  <span>Potential reach: 50K+ developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h2>
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
                  <span className="text-sm text-gray-500">Content Quality</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Audience Growth</span>
                  <span className="text-sm font-medium text-gray-900">+15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Content Ideas</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Product Demo Series</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Create short-form video demos highlighting key features.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Eye className="w-4 h-4" />
                  <span>Est. reach: 25K+</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Tech Deep Dives</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Technical blog posts about your architecture and stack.
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>High conversion potential</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
            <div className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium mb-1">#AIInnovation</h3>
                <p className="text-sm text-blue-100">
                  Growing discussion around AI implementation
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium mb-1">#DeveloperProductivity</h3>
                <p className="text-sm text-blue-100">
                  High engagement with development tools
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium mb-1">#CloudNative</h3>
                <p className="text-sm text-blue-100">
                  Rising interest in cloud architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;