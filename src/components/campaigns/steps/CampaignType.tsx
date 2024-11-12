import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Instagram, Twitter, Facebook, Linkedin, Globe, MessageCircle } from 'lucide-react';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

const channels = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    description: 'Visual content and stories'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    description: 'Real-time updates and engagement'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    description: 'Community building and detailed content'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    description: 'Professional networking and B2B'
  }
];

const frequencies = [
  { value: 'daily', label: 'Daily (1-2 posts per day)' },
  { value: 'weekly', label: 'Weekly (3-5 posts per week)' },
  { value: 'biweekly', label: 'Bi-weekly (1-2 posts per week)' },
  { value: 'monthly', label: 'Monthly (2-3 posts per month)' }
];

function CampaignType({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Campaign Type</h2>
        <p className="text-sm text-gray-500">Select channels and posting frequency</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Social Media Channels
          </label>
          <div className="grid grid-cols-2 gap-4">
            {channels.map((channel) => (
              <label
                key={channel.id}
                className="relative flex items-start p-4 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    {...register('type.channels')}
                    value={channel.id}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <channel.icon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{channel.name}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                </div>
              </label>
            ))}
          </div>
          {errors?.channels && (
            <p className="mt-2 text-sm text-red-600">{errors.channels.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Posting Frequency
          </label>
          <select
            {...register('type.frequency')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select frequency</option>
            {frequencies.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
          {errors?.frequency && (
            <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
          )}
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-green-900">Channel Recommendations</h3>
          </div>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Instagram: Best for visual product showcases
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              Twitter: Ideal for real-time updates and engagement
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              LinkedIn: Recommended for B2B content
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CampaignType;