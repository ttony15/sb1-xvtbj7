import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

const schema = z.object({
  additionalValues: z.string().optional(),
  customMessaging: z.string().optional()
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  data?: Partial<FormData>;
  aiAnalysis?: {
    brandAnalysis?: {
      tone?: string;
      values?: string[];
      uniqueSellingPoints?: string[];
    };
  };
  isLoading?: boolean;
}

function BrandVoice({ onNext, onBack, data = {}, aiAnalysis = {}, isLoading = false }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      additionalValues: data.additionalValues || '',
      customMessaging: data.customMessaging || ''
    }
  });

  const hasAiAnalysis = aiAnalysis?.brandAnalysis && (
    aiAnalysis.brandAnalysis.tone ||
    (aiAnalysis.brandAnalysis.values && aiAnalysis.brandAnalysis.values.length > 0) ||
    (aiAnalysis.brandAnalysis.uniqueSellingPoints && aiAnalysis.brandAnalysis.uniqueSellingPoints.length > 0)
  );

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* AI-Detected Brand Values */}
      {hasAiAnalysis && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">AI-Detected Brand Values</h3>
          </div>
          
          <div className="space-y-4">
            {aiAnalysis.brandAnalysis?.tone && (
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-2">Brand Tone</h4>
                <p className="text-blue-800">{aiAnalysis.brandAnalysis.tone}</p>
              </div>
            )}

            {aiAnalysis.brandAnalysis?.values && aiAnalysis.brandAnalysis.values.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-2">Core Values</h4>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.brandAnalysis.values.map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {aiAnalysis.brandAnalysis?.uniqueSellingPoints && aiAnalysis.brandAnalysis.uniqueSellingPoints.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-2">Unique Value Proposition</h4>
                <ul className="space-y-2">
                  {aiAnalysis.brandAnalysis.uniqueSellingPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-blue-800">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Brand Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {hasAiAnalysis ? 'Additional Brand Information' : 'Brand Information'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {hasAiAnalysis ? 'Additional Values (Optional)' : 'Brand Values'}
            </label>
            <input
              type="text"
              {...register('additionalValues')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter additional brand values (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {hasAiAnalysis ? 'Custom Messaging (Optional)' : 'Brand Messaging'}
            </label>
            <textarea
              {...register('customMessaging')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional messaging guidelines or notes"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
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

export default BrandVoice;