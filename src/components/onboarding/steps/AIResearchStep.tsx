import React, { useState, useEffect } from 'react';
import { Search, Globe, Users, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface Props {
  onComplete: (data: any) => void;
  companyData: any;
}

function AIResearchStep({ onComplete, companyData }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const researchSteps = [
    {
      title: 'Analyzing Company Data',
      description: 'Extracting insights from your company profile',
      icon: Search
    },
    {
      title: 'Market Research',
      description: 'Analyzing industry trends and market position',
      icon: Globe
    },
    {
      title: 'Competitor Analysis',
      description: 'Identifying key competitors and strategies',
      icon: Users
    },
    {
      title: 'Performance Metrics',
      description: 'Establishing baseline metrics and KPIs',
      icon: BarChart3
    },
    {
      title: 'Growth Opportunities',
      description: 'Identifying potential growth areas',
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepSize = 100 / researchSteps.length;
    setCurrentStep(Math.floor(progress / stepSize));

    // When progress reaches 100%, generate analysis results and proceed
    if (progress === 100) {
      const analysisResults = {
        marketAnalysis: {
          trends: ['Digital Transformation', 'AI Integration', 'Cloud Computing'],
          opportunities: ['Enterprise Market', 'SMB Segment', 'International Expansion'],
          risks: ['Increasing Competition', 'Rapid Tech Changes', 'Market Saturation']
        },
        competitorAnalysis: {
          directCompetitors: ['Competitor A', 'Competitor B', 'Competitor C'],
          strengths: ['Product Innovation', 'Market Presence', 'Customer Support'],
          gaps: ['Enterprise Integration', 'AI Capabilities', 'Industry Solutions']
        },
        recommendations: {
          shortTerm: ['Enhance Product Features', 'Improve Marketing Reach', 'Strengthen Support'],
          longTerm: ['Expand Market Presence', 'Develop New Products', 'Build Partnerships']
        }
      };

      // Short delay before completing to ensure smooth transition
      setTimeout(() => {
        onComplete(analysisResults);
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Research in Progress</h2>
          <p className="text-sm text-gray-500">Analyzing your company and market data</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Research Steps */}
        <div className="space-y-6">
          {researchSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const Icon = step.icon;

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'border-blue-200 bg-blue-50'
                    : isCompleted
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    isActive
                      ? 'bg-blue-100'
                      : isCompleted
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isActive
                        ? 'text-blue-600'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isActive
                        ? 'text-blue-900'
                        : isCompleted
                        ? 'text-green-900'
                        : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive
                        ? 'text-blue-600'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>
            Generating AI insights...
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIResearchStep;