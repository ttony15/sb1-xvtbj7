import React from 'react';
import { Building2, Globe, Users2, Briefcase, Edit, TrendingUp, Layout } from 'lucide-react';

interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  size: string;
  founded: string;
  background: string;
  strengths: string[];
  challenges: string[];
  marketPosition: {
    currentShare: string;
    growth: string;
    competitors: string[];
    differentiators: string[];
  };
}

interface Props {
  companyInfo: CompanyInfo;
  onEdit?: () => void;
}

function CompanyOverview({ companyInfo, onEdit }: Props) {
  if (!companyInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Company information not available</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Title Section */}
      <div className="bg-white border-b border-gray-200 p-8 mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <Layout className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Generated Marketing Strategy Plan
        </h1>
        <p className="text-xl text-gray-600">
          Your Personalized Marketing Roadmap
        </p>
      </div>

      {/* Company Overview Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <img
              src={companyInfo.logo}
              alt={companyInfo.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
              <p className="text-gray-500">{companyInfo.industry}</p>
            </div>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Company Size</span>
            </div>
            <p className="text-gray-600">{companyInfo.size}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Founded</span>
            </div>
            <p className="text-gray-600">{companyInfo.founded}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">Market Growth</span>
            </div>
            <p className="text-gray-600">{companyInfo.marketPosition.growth}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Background</h2>
          <p className="text-gray-600">{companyInfo.background}</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Strengths</h2>
            <div className="space-y-3">
              {companyInfo.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  {strength}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Challenges</h2>
            <div className="space-y-3">
              {companyInfo.challenges.map((challenge, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  {challenge}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Position</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Key Competitors</h3>
              <div className="space-y-3">
                {companyInfo.marketPosition.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {competitor}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Key Differentiators</h3>
              <div className="space-y-3">
                {companyInfo.marketPosition.differentiators.map((diff, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {diff}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyOverview;