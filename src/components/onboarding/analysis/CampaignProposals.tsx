import React from 'react';
import { Target, Users, Calendar, BarChart3, ArrowRight } from 'lucide-react';

interface CampaignProposal {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  audience: {
    segments: string[];
    interests: string[];
    behavior: string[];
  };
  channels: string[];
  timeline: string;
  metrics: {
    name: string;
    target: string;
  }[];
  budget: {
    range: string;
    allocation: Record<string, string>;
  };
}

interface Props {
  campaigns: CampaignProposal[];
}

function CampaignProposals({ campaigns }: Props) {
  return (
    <div className="space-y-8">
      {campaigns.map((campaign, index) => (
        <div key={campaign.id} className="border border-gray-200 rounded-xl p-6">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-3">
              Campaign {index + 1}: {campaign.name}
            </div>
            <p className="text-gray-600">{campaign.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Campaign Objectives</h4>
              <div className="space-y-2">
                {campaign.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    {objective}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Target Audience</h4>
              <div className="space-y-2">
                {campaign.audience.segments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-blue-600" />
                    {segment}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Distribution Channels</h4>
              <div className="space-y-2">
                {campaign.channels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    {channel}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>{campaign.timeline}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Budget Allocation</h4>
              <div className="space-y-2">
                {Object.entries(campaign.budget.allocation).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Success Metrics</h4>
            <div className="grid grid-cols-3 gap-4">
              {campaign.metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.name}</span>
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{metric.target}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <span className="font-medium">View Campaign Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CampaignProposals;