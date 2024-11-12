import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  additionalInfo: z.object({
    challenges: z.string().min(10, 'Please describe your challenges'),
    competitors: z.array(z.string()).min(1, 'Add at least one competitor'),
    targetAudience: z.string().min(10, 'Describe your target audience'),
    additionalNotes: z.string().optional()
  })
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  data?: Partial<FormData>;
}

function AdditionalInfo({ onNext, onBack, data = {} }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: data
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are your main marketing challenges?
            </label>
            <textarea
              {...register('additionalInfo.challenges')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the challenges you're facing..."
            />
            {errors.additionalInfo?.challenges && (
              <p className="mt-1 text-sm text-red-600">
                {errors.additionalInfo.challenges.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Who are your main competitors?
            </label>
            <input
              type="text"
              {...register('additionalInfo.competitors.0')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter competitor names..."
            />
            {errors.additionalInfo?.competitors && (
              <p className="mt-1 text-sm text-red-600">
                {errors.additionalInfo.competitors.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Describe your target audience
            </label>
            <textarea
              {...register('additionalInfo.targetAudience')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Who are you trying to reach?"
            />
            {errors.additionalInfo?.targetAudience && (
              <p className="mt-1 text-sm text-red-600">
                {errors.additionalInfo.targetAudience.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register('additionalInfo.additionalNotes')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any other information you'd like to share..."
            />
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Complete Setup
        </button>
      </div>
    </form>
  );
}

export default AdditionalInfo;