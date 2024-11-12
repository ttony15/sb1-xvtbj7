import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Image, Video, FileText, Link, Hash } from 'lucide-react';

const schema = z.object({
  contentTypes: z.array(z.string()).min(1, 'Select at least one content type'),
  topics: z.string().min(2, 'Add at least two topics').transform(str => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0)
  ),
  tone: z.string().min(1, 'Select a content tone'),
  frequency: z.object({
    posts: z.string().min(1, 'Select posting frequency'),
    platforms: z.array(z.string()).min(1, 'Select at least one platform')
  }),
  hashtags: z.string().min(3, 'Add at least three hashtags').transform(str => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0)
  ),
  competitors: z.array(z.string()).optional()
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  data?: Partial<FormData>;
  isLoading?: boolean;
}

function ContentPreferences({ onNext, onBack, data = {}, isLoading = false }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contentTypes: data.contentTypes || [],
      topics: Array.isArray(data.topics) ? data.topics.join(', ') : '',
      tone: data.tone || '',
      frequency: {
        posts: data.frequency?.posts || '',
        platforms: data.frequency?.platforms || []
      },
      hashtags: Array.isArray(data.hashtags) ? data.hashtags.join(', ') : '',
      competitors: data.competitors || []
    }
  });

  const contentTypes = [
    { id: 'images', label: 'Images & Graphics', icon: Image },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'articles', label: 'Articles & Blog Posts', icon: FileText },
    { id: 'links', label: 'Link Posts', icon: Link }
  ];

  const platforms = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'linkedin', label: 'LinkedIn' }
  ];

  const tones = [
    'Professional',
    'Casual',
    'Technical',
    'Educational',
    'Inspirational'
  ];

  const frequencies = [
    '1-2 times per week',
    '3-4 times per week',
    '5-7 times per week',
    'Multiple times per day'
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Content Preferences</h2>
        <p className="text-sm text-gray-500 mb-6">
          Define your content strategy and posting preferences.
        </p>

        <div className="space-y-6">
          {/* Content Types */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Content Types</h3>
            <div className="grid grid-cols-2 gap-4">
              {contentTypes.map(type => (
                <label
                  key={type.id}
                  className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200"
                >
                  <input
                    type="checkbox"
                    {...register('contentTypes')}
                    value={type.id}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center ml-3">
                    <type.icon className="w-5 h-5 text-gray-500" />
                    <span className="ml-2 text-sm text-gray-900">{type.label}</span>
                  </div>
                </label>
              ))}
            </div>
            {errors.contentTypes && (
              <p className="mt-2 text-sm text-red-600">{errors.contentTypes.message}</p>
            )}
          </div>

          {/* Posting Preferences */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Posting Preferences</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Tone
                </label>
                <select
                  {...register('tone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select tone</option>
                  {tones.map(tone => (
                    <option key={tone} value={tone.toLowerCase()}>{tone}</option>
                  ))}
                </select>
                {errors.tone && (
                  <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posting Frequency
                </label>
                <select
                  {...register('frequency.posts')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  {frequencies.map(freq => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
                {errors.frequency?.posts && (
                  <p className="mt-1 text-sm text-red-600">{errors.frequency.posts.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platforms
              </label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map(platform => (
                  <label key={platform.id} className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('frequency.platforms')}
                      value={platform.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{platform.label}</span>
                  </label>
                ))}
              </div>
              {errors.frequency?.platforms && (
                <p className="mt-1 text-sm text-red-600">{errors.frequency.platforms.message}</p>
              )}
            </div>
          </div>

          {/* Topics & Hashtags */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Topics & Hashtags</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Topics
                </label>
                <input
                  type="text"
                  {...register('topics')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Product updates, Industry news, Tips & tricks (comma-separated)"
                />
                {errors.topics && (
                  <p className="mt-1 text-sm text-red-600">{errors.topics.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Hashtags
                </label>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('hashtags')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add your preferred hashtags (comma-separated)"
                  />
                </div>
                {errors.hashtags && (
                  <p className="mt-1 text-sm text-red-600">{errors.hashtags.message}</p>
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

export default ContentPreferences;