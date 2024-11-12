import React from 'react';
import { Target, TrendingUp, Users, Calendar } from 'lucide-react';

interface MarketingObjective {
  category: string;
  target: string;
  timeline: string;
  metrics: string[];
}

interface Props {
  objectives: MarketingObjective[];
}

function MarketingObjectives({ objectives }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Target className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Marketing Objectives</h2>
          <p className="text-sm text-gray-500">Key goals and targets</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {objectives.map((objective, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">{objective.category}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Target</span>
                  <span className="text-sm font-medium text-gray-900">{objective.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{objective.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>0% Complete</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
                <div className="space-y-2">
                  {objective.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketingObjectives;