import React from 'react';
import { Users, Map, Target, Calendar, Filter, Search, PieChart, BarChart3, TrendingUp, Globe } from 'lucide-react';

function Audience() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audience Analytics</h1>
          <p className="text-gray-500">Understand your audience demographics and behavior</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select className="text-sm text-gray-600 border-none focus:ring-0">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Audience</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-900">45.2K</p>
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Map className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Location</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-900">USA</p>
                <span className="text-sm text-gray-500">35%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Engagement Rate</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-900">4.8%</p>
                <span className="text-sm text-green-600">+0.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Globe className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Countries</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-gray-900">28</p>
                <span className="text-sm text-green-600">+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Age Distribution</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-400">
            Age distribution chart will be displayed here
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Gender Distribution</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
          </div>
          <div className="h-80 flex items-center justify-center text-gray-400">
            Gender distribution chart will be displayed here
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Geographic Distribution</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="h-96 flex items-center justify-center text-gray-400">
          World map with audience distribution will be displayed here
        </div>
      </div>

      {/* Interests & Behavior */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Interests</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {['Technology', 'Business', 'Marketing', 'Innovation'].map((interest, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{interest}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${85 - (index * 15)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-900">{85 - (index * 15)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Online Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View Details</button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Activity timeline chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Audience;