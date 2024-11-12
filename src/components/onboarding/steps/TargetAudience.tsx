import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Users, Target, Map, Briefcase } from 'lucide-react';

const schema = z.object({
  demographics: z.object({
    ageRanges: z.array(z.string()).min(1, 'Select at least one age range'),
    locations: z.array(z.string()).min(1, 'Select at least one location'),
    jobTitles: z.string().min(1, 'Add at least one job title'),
    industries: z.array(z.string()).min(1, 'Select at least one industry')
  }),
  interests: z.string().min(2, 'Add at least two interests').transform(str => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0)
  ),
  challenges: z.string().min(2, 'Add at least two challenges').transform(str => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0)
  ),
  goals: z.string().min(2, 'Add at least two goals').transform(str => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0)
  )
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  data?: Partial<FormData>;
  isLoading?: boolean;
}

function TargetAudience({ onNext, onBack, data = {}, isLoading = false }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      demographics: {
        ageRanges: data.demographics?.ageRanges || [],
        locations: data.demographics?.locations || [],
        jobTitles: data.demographics?.jobTitles || '',
        industries: data.demographics?.industries || []
      },
      interests: data.interests?.join(', ') || '',
      challenges: data.challenges?.join(', ') || '',
      goals: data.goals?.join(', ') || ''
    }
  });

  const ageRanges = [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55+'
  ];

  const locations = [
    'United States',
    'Canada',
    'United Kingdom',
    'Europe',
    'Asia Pacific',
    'Global'
  ];

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Professional Services'
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Target Audience</h2>
        <p className="text-sm text-gray-500 mb-6">
          Define your ideal customer profile to create targeted content.
        </p>

        <div className="space-y-6">
          {/* Demographics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Demographics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Ranges
                </label>
                <div className="space-y-2">
                  {ageRanges.map(range => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('demographics.ageRanges')}
                        value={range}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
                {errors.demographics?.ageRanges && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.demographics.ageRanges.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Locations
                </label>
                <div className="space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('demographics.locations')}
                        value={location}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{location}</span>
                    </label>
                  ))}
                </div>
                {errors.demographics?.locations && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.demographics.locations.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Titles
              </label>
              <input
                type="text"
                {...register('demographics.jobTitles')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., CTO, IT Manager, Developer (comma-separated)"
              />
              {errors.demographics?.jobTitles && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.demographics.jobTitles.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Industries
              </label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map(industry => (
                  <label key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('demographics.industries')}
                      value={industry}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{industry}</span>
                  </label>
                ))}
              </div>
              {errors.demographics?.industries && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.demographics.industries.message}
                </p>
              )}
            </div>
          </div>

          {/* Interests & Behaviors */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Interests & Behaviors</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Interests
                </label>
                <input
                  type="text"
                  {...register('interests')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Technology trends, Digital transformation (comma-separated)"
                />
                {errors.interests && (
                  <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pain Points & Challenges
                </label>
                <input
                  type="text"
                  {...register('challenges')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Time management, Cost optimization (comma-separated)"
                />
                {errors.challenges && (
                  <p className="mt-1 text-sm text-red-600">{errors.challenges.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goals & Aspirations
                </label>
                <input
                  type="text"
                  {...register('goals')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Increase productivity, Scale operations (comma-separated)"
                />
                {errors.goals && (
                  <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default TargetAudience;