import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Target, BarChart3, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

const schema = z.object({
  objectives: z.array(z.string()).min(1, 'Select at least one objective'),
  timeline: z.object({
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required')
  }),
  budget: z.object({
    range: z.string().min(1, 'Select a budget range'),
    allocation: z.object({
      advertising: z.string().min(1, 'Required'),
      content: z.string().min(1, 'Required'),
      tools: z.string().min(1, 'Required')
    })
  }),
  kpis: z.array(z.string()).min(2, 'Select at least two KPIs')
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: any) => Promise<void>;
  companyData: any;
  researchData: any;
}

function GoalsStrategyStep({ onSubmit, companyData, researchData }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      objectives: [],
      timeline: {
        startDate: '',
        endDate: ''
      },
      budget: {
        range: '',
        allocation: {
          advertising: '40',
          content: '40',
          tools: '20'
        }
      },
      kpis: []
    }
  });

  const objectives = [
    'Brand Awareness',
    'Lead Generation',
    'Sales Growth',
    'Customer Engagement',
    'Market Share',
    'Customer Retention'
  ];

  const kpis = [
    'Website Traffic',
    'Social Media Engagement',
    'Lead Conversion Rate',
    'Customer Acquisition Cost',
    'Return on Ad Spend',
    'Brand Mentions',
    'Email Open Rate'
  ];

  const budgetRanges = [
    '$1,000 - $5,000/month',
    '$5,000 - $10,000/month',
    '$10,000 - $25,000/month',
    '$25,000+/month'
  ];

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setError(null);
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate strategy. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Marketing Objectives */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Marketing Objectives</h3>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          {errors.objectives && (
            <p className="mt-2 text-sm text-red-600">{errors.objectives.message}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Timeline</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register('timeline.startDate')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.timeline?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.timeline.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                {...register('timeline.endDate')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.timeline?.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.timeline.endDate.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Planning</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <select
                {...register('budget.range')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {errors.budget?.range && (
                <p className="mt-1 text-sm text-red-600">{errors.budget.range.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Allocation (%)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Advertising</label>
                  <input
                    type="number"
                    {...register('budget.allocation.advertising')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Content</label>
                  <input
                    type="number"
                    {...register('budget.allocation.content')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tools</label>
                  <input
                    type="number"
                    {...register('budget.allocation.tools')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((kpi) => (
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
            <p className="mt-2 text-sm text-red-600">{errors.kpis.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                <span>Generate Strategy</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalsStrategyStep;