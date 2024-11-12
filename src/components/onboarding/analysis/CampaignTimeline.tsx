import React from 'react';
import { Calendar, Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Milestone {
  date: string;
  event: string;
  status: 'pending' | 'completed' | 'in-progress';
}

interface Props {
  timeline: {
    start: string;
    end: string;
    milestones: Milestone[];
  };
}

function CampaignTimeline({ timeline }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'pending':
        return <Circle className="w-6 h-6 text-gray-400" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Calendar className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Campaign Timeline</h2>
          <p className="text-sm text-gray-500">
            {timeline.start} - {timeline.end}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>

        <div className="space-y-8">
          {timeline.milestones.map((milestone, index) => (
            <div key={index} className="relative flex gap-8 items-start">
              <div className="relative z-10 flex-shrink-0">
                {getStatusIcon(milestone.status)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{milestone.event}</h3>
                    <span className="text-sm text-gray-500">{milestone.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignTimeline;