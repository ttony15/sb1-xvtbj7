import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Clock, Users, ArrowRight } from 'lucide-react';

function LiveAIInsights() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Live AI Insights</h2>
            <p className="text-sm text-gray-500">Real-time recommendations</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium text-gray-900">Content Optimization</h3>
          </div>
          <p className="text-sm text-gray-600">
            Video content is driving 2.5x more engagement than other formats.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-green-600" />
            <h3 className="font-medium text-gray-900">Best Posting Times</h3>
          </div>
          <p className="text-sm text-gray-600">
            Optimal engagement window: 9:00 AM - 11:00 AM EST
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-orange-600" />
            <h3 className="font-medium text-gray-900">Audience Insights</h3>
          </div>
          <p className="text-sm text-gray-600">
            Tech decision-makers are most active during weekday mornings
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/insights')}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
      >
        View All Insights
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default LiveAIInsights;