import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Target, Rocket, Users, TrendingUp } from 'lucide-react';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

const objectives = [
  {
    id: 'awareness',
    label: 'Brand Awareness',
    description: 'Increase visibility and recognition',
    icon: Target
  },
  {
    id: 'leads',
    label: 'Lead Generation',
    description: 'Generate new business opportunities',
    icon: Users
  },
  {
    id: 'engagement',
    label: 'Engagement',
    description: 'Boost interaction with your content',
    icon: TrendingUp
  },
  {
    id: 'conversion',
    label: 'Conversion',
    description: 'Drive sales and conversions',
    icon: Rocket
  }
];

function CampaignBasics({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Campaign Basics</h2>
        <p className="text-sm text-gray-500">Define your campaign's core information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            {...register('basics.name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter campaign name"
          />
          {errors?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Description
          </label>
          <textarea
            {...register('basics.description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your campaign objectives and goals"
          />
          {errors?.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Campaign Objectives
          </label>
          <div className="grid grid-cols-2 gap-4">
            {objectives.map((objective) => (
              <label
                key={objective.id}
                className="relative flex items-start p-4 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    {...register('basics.objectives')}
                    value={objective.id}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <objective.icon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{objective.label}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{objective.description}</p>
                </div>
              </label>
            ))}
          </div>
          {errors?.objectives && (
            <p className="mt-2 text-sm text-red-600">{errors.objectives.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignBasics;