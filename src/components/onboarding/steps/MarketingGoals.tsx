import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Target, BarChart3, Users, TrendingUp } from 'lucide-react';

const schema = z.object({
  objectives: z.array(z.string()).min(1, 'Select at least one objective'),
  targets: z.array(z.string()).optional(),
  timelines: z.array(z.string()).optional(),
  kpis: z.array(z.string()).min(2, 'Select at least two KPIs'),
  budgetRange: z.string().min(1, 'Select a budget range'),
  startDate: z.string().min(1, 'Select a start date'),
  budgetAllocation: z.object({
    social: z.string().optional(),
    content: z.string().optional()
  }).optional()
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  data?: Partial<FormData>;
  isLoading?: boolean;
}

function MarketingGoals({ onNext, onBack, data = {}, isLoading = false }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      objectives: data.objectives || [],
      kpis: data.kpis || [],
      budgetRange: data.budgetRange || '',
      startDate: data.startDate || '',
      budgetAllocation: data.budgetAllocation || { social: '', content: '' }
    }
  });

  const objectives = [
    'Brand Awareness',
    'Lead Generation',
    'Customer Engagement',
    'Sales Growth',
    'Market Share',
    'Customer Retention'
  ];

  const kpis = [
    'Social Media Engagement Rate',
    'Website Traffic',
    'Lead Conversion Rate',
    'Customer Acquisition Cost',
    'Return on Ad Spend',
    'Email Open Rate',
    'Content Reach'
  ];

  const budgetRanges = [
    '$1,000 - $5,000/month',
    '$5,000 - $10,000/month',
    '$10,000 - $25,000/month',
    '$25,000+/month'
  ];

  const onSubmit = (formData: FormData) => {
    // Transform the data to match the expected structure
    const transformedData = {
      marketingGoals: {
        objectives: formData.objectives.map(objective => ({
          type: objective,
          target: '',
          timeline: ''
        })),
        kpis: formData.kpis,
        budget: {
          range: formData.budgetRange,
          allocation: {
            social: parseInt(formData.budgetAllocation?.social || '0'),
            content: parseInt(formData.budgetAllocation?.content || '0')
          }
        },
        timeline: {
          startDate: formData.startDate,
          milestones: []
        }
      }
    };

    onNext(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Marketing Goals</h2>
        <p className="text-sm text-gray-500 mb-6">
          Set your marketing objectives and success metrics.
        </p>

        <div className="space-y-6">
          {/* Marketing Objectives */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Marketing Objectives</h3>
            <div className="space-y-4">
              {objectives.map((objective) => (
                <label key={objective} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('objectives')}
                    value={objective}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{objective}</span>
                </label>
              ))}
              {errors.objectives && (
                <p className="mt-1 text-sm text-red-600">{errors.objectives.message}</p>
              )}
            </div>
          </div>

          {/* KPIs */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              {kpis.map(kpi => (
                <label key={kpi} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('kpis')}
                    value={kpi}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{kpi}</span>
                </label>
              ))}
            </div>
            {errors.kpis && (
              <p className="mt-1 text-sm text-red-600">{errors.kpis.message}</p>
            )}
          </div>

          {/* Budget & Timeline */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Budget & Timeline</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marketing Budget
                </label>
                <select
                  {...register('budgetRange')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p className="mt-1 text-sm text-red-600">{errors.budgetRange.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Start Date
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Allocation
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Social Media (%)</label>
                  <input
                    type="number"
                    {...register('budgetAllocation.social')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Content Creation (%)</label>
                  <input
                    type="number"
                    {...register('budgetAllocation.content')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
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

export default MarketingGoals;