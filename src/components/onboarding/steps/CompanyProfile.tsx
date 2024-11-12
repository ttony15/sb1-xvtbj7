import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building, Globe, Instagram, Twitter, Facebook, Linkedin, Loader2, AlertCircle } from 'lucide-react';

const schema = z.object({
  companyProfile: z.object({
    name: z.string().min(2, 'Company name is required'),
    website: z.string().url('Please enter a valid website URL'),
    industry: z.string().min(1, 'Industry is required'),
    size: z.string().min(1, 'Company size is required'),
    description: z.string().optional(),
    socialMedia: z.object({
      instagram: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
      twitter: z.string().url('Please enter a valid Twitter URL').optional().or(z.literal('')),
      facebook: z.string().url('Please enter a valid Facebook URL').optional().or(z.literal('')),
      linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal(''))
    }).optional()
  })
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: (data: FormData, aiAnalysis?: any) => void;
  data?: Partial<FormData>;
  isLoading?: boolean;
}

function CompanyProfile({ onNext, data = {}, isLoading = false }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyProfile: {
        name: data?.companyProfile?.name || '',
        website: data?.companyProfile?.website || '',
        industry: data?.companyProfile?.industry || '',
        size: data?.companyProfile?.size || '',
        description: data?.companyProfile?.description || '',
        socialMedia: data?.companyProfile?.socialMedia || {}
      }
    }
  });

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setError(null);
      setIsAnalyzing(true);

      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI analysis response
      const aiAnalysis = {
        companyInfo: {
          type: 'B2B SaaS',
          mainProducts: ['Product A', 'Product B'],
          keyFeatures: ['Cloud-based', 'AI-powered', 'Enterprise-ready'],
          targetMarket: 'Enterprise Software',
          competitors: ['Competitor A', 'Competitor B', 'Competitor C']
        },
        marketingInsights: {
          recommendedChannels: ['LinkedIn', 'Twitter', 'Industry Forums'],
          contentTypes: ['Technical Blogs', 'Case Studies', 'Video Tutorials'],
          keyTopics: ['Digital Transformation', 'Enterprise Solutions', 'Tech Innovation']
        },
        brandAnalysis: {
          tone: 'Professional & Technical',
          values: ['Innovation', 'Reliability', 'Enterprise-Focus'],
          uniqueSellingPoints: [
            'Advanced AI capabilities',
            'Enterprise-grade security',
            'Seamless integration'
          ]
        }
      };

      onNext(formData, aiAnalysis);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to analyze company data');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501+ employees'
  ];

  const industries = [
    'Software & Technology',
    'E-commerce',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Professional Services',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            {...register('companyProfile.name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
          />
          {errors.companyProfile?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.companyProfile.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              {...register('companyProfile.website')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          {errors.companyProfile?.website && (
            <p className="mt-1 text-sm text-red-600">{errors.companyProfile.website.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Description
          </label>
          <textarea
            {...register('companyProfile.description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of your company..."
          />
        </div>
      </div>

      {/* Social Media */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Social Media Profiles
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-pink-600" />
            <input
              type="url"
              {...register('companyProfile.socialMedia.instagram')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Instagram URL"
            />
          </div>

          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-blue-400" />
            <input
              type="url"
              {...register('companyProfile.socialMedia.twitter')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Twitter URL"
            />
          </div>

          <div className="flex items-center gap-3">
            <Facebook className="w-5 h-5 text-blue-600" />
            <input
              type="url"
              {...register('companyProfile.socialMedia.facebook')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Facebook URL"
            />
          </div>

          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <input
              type="url"
              {...register('companyProfile.socialMedia.linkedin')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="LinkedIn URL"
            />
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            {...register('companyProfile.industry')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.companyProfile?.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.companyProfile.industry.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Size
          </label>
          <select
            {...register('companyProfile.size')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select size</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.companyProfile?.size && (
            <p className="mt-1 text-sm text-red-600">{errors.companyProfile.size.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing Company Data...
          </>
        ) : (
          'Continue'
        )}
      </button>

      {isAnalyzing && (
        <div className="text-center text-sm text-gray-500">
          <p>Our AI is analyzing your company data to provide personalized recommendations.</p>
          <p>This may take a few moments...</p>
        </div>
      )}
    </form>
  );
}

export default CompanyProfile;