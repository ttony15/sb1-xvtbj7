import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Users, MapPin, Target } from 'lucide-react';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

const demographics = [
  '18-24', '25-34', '35-44', '45-54', '55+'
];

const locations = [
  'United States', 'Canada', 'United Kingdom', 'Europe', 'Asia Pacific', 'Global'
];

const interests = [
  'Technology', 'Business', 'Marketing', 'Innovation', 'Software Development',
  'Digital Transformation', 'Productivity', 'Entrepreneurship'
];

function TargetAudience({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Target Audience</h2>
        <p className="text-sm text-gray-500">Define who you want to reach with this campaign</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Demographics
          </label>
          <div className="grid grid-cols-2 gap-4">
            {demographics.map((age) => (
              <label
                key={age}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  {...register('audience.demographics')}
                  value={age}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-900">{age} years</span>
              </label>
            ))}
          </div>
          {errors?.demographics && (
            <p className="mt-2 text-sm text-red-600">{errors.demographics.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Locations
          </label>
          <div className="grid grid-cols-2 gap-4">
            {locations.map((location) => (
              <label
                key={location}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  {...register('audience.locations')}
                  value={location}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-900">{location}</span>
              </label>
            ))}
          </div>
          {errors?.locations && (
            <p className="mt-2 text-sm text-red-600">{errors.locations.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Interests
          </label>
          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest) => (
              <label
                key={interest}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  {...register('audience.interests')}
                  value={interest}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-900">{interest}</span>
              </label>
            ))}
          </div>
          {errors?.interests && (
            <p className="mt-2 text-sm text-red-600">{errors.interests.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TargetAudience;