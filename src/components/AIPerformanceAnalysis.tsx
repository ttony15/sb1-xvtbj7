import React from 'react';
import { BarChart3, TrendingUp, Users, ArrowUp, ArrowDown, Clock, Target, MessageCircle, Eye, Zap, Award, LineChart } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
}

function AIPerformanceAnalysis() {
  const metrics: PerformanceMetric[] = [
    { label: 'Recent Content Score', value: '8.3/10', trend: 'up', change: '+0.5' },
    { label: 'Campaign Performance', value: '8.1/10', trend: 'up', change: '+0.3' },
    { label: 'Audience Engagement', value: '7.7/10', trend: 'up', change: '+0.2' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Performance Analysis</h2>
            <p className="text-sm text-gray-500">Live insights • Updated {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <div className="flex items-center gap-1">
                {metric.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Content Performance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Recent Content Performance</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Product Feature Demo</span>
                <span className="text-sm text-gray-500">Instagram</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">8.7% engagement</span>
                <span className="text-gray-600">15.0K reach</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Tech Tutorial Series</span>
                <span className="text-sm text-gray-500">LinkedIn</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">7.9% engagement</span>
                <span className="text-gray-600">12.0K reach</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Video content outperforms images by 2.3x
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Tutorial posts receive 45% more saves
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Best engagement during 9-11 AM EST
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Active Campaigns</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Q2 Growth Campaign</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">active</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">65% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="text-sm text-gray-600">4.8% engagement</div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Product Launch</span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">scheduled</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">25% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Q2 Campaign exceeding targets by 15%
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Product demos driving highest conversion
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              Cross-platform approach showing strong results
            </div>
          </div>
        </div>
      </div>

      {/* Audience Engagement */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-orange-600" />
          <h3 className="font-medium text-gray-900">Audience Engagement</h3>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Engagement Rate</p>
            <p className="text-lg font-semibold text-gray-900">4.8%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Audience Growth</p>
            <p className="text-lg font-semibold text-green-600">+12%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Retention Rate</p>
            <p className="text-lg font-semibold text-gray-900">85%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Comment Growth</p>
            <p className="text-lg font-semibold text-green-600">+35%</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
            Tech decision-makers most active 9-11 AM
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
            Tutorial content drives 2x more follows
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
            Comments up 35% on product features
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPerformanceAnalysis;