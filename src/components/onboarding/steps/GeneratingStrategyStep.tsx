import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Target, Users, MessageSquare, BarChart3, Calendar } from 'lucide-react';

interface Props {
  strategyData: any;
}

function GeneratingStrategyStep({ strategyData }: Props) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const generationSteps = [
    {
      title: 'Analyzing Goals & Data',
      description: 'Processing your objectives and market research',
      icon: Brain
    },
    {
      title: 'Creating Marketing Strategy',
      description: 'Developing comprehensive marketing approach',
      icon: Target
    },
    {
      title: 'Generating Campaign Plans',
      description: 'Crafting targeted marketing campaigns',
      icon: Users
    },
    {
      title: 'Building Content Strategy',
      description: 'Planning content themes and calendar',
      icon: MessageSquare
    },
    {
      title: 'Setting KPIs',
      description: 'Establishing performance metrics',
      icon: BarChart3
    },
    {
      title: 'Finalizing Timeline',
      description: 'Creating implementation schedule',
      icon: Calendar
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
    const stepSize = 100 / generationSteps.length;
    setCurrentStep(Math.floor(progress / stepSize));

    // When progress reaches 100%, navigate to strategy page
    if (progress === 100) {
      setTimeout(() => {
        navigate('/strategy', { 
          replace: true,
          state: { strategyData }
        });
      }, 500);
    }
  }, [progress, navigate, strategyData]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Generating Your Marketing Strategy</h2>
          <p className="text-sm text-gray-500">Our AI is crafting your personalized marketing plan</p>
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

        {/* Generation Steps */}
        <div className="space-y-6">
          {generationSteps.map((step, index) => {
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

export default GeneratingStrategyStep;