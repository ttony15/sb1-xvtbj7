import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Sparkles, Target, Users, MessageSquare, Globe, AlertCircle } from 'lucide-react';
import CompanyProfile from './steps/CompanyProfile';
import BrandVoice from './steps/BrandVoice';
import MarketingGoals from './steps/MarketingGoals';
import TargetAudience from './steps/TargetAudience';
import ContentPreferences from './steps/ContentPreferences';
import AdditionalInfo from './steps/AdditionalInfo';
import LoadingAnalysis from './LoadingAnalysis';
import AIAnalysisResults from './AIAnalysisResults';
import { useOnboarding } from '../../contexts/OnboardingContext';

function OnboardingFlow() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { currentStep, onboardingData, saveProgress, goToNextStep, goToPreviousStep } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const steps = [
    {
      title: 'Company Profile',
      description: 'Tell us about your business',
      component: CompanyProfile,
      icon: Building,
      color: 'blue'
    },
    {
      title: 'Brand Voice',
      description: 'Define your brand personality',
      component: BrandVoice,
      icon: Sparkles,
      color: 'purple'
    },
    {
      title: 'Target Audience',
      description: 'Who are you trying to reach?',
      component: TargetAudience,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Content Preferences',
      description: 'Set your content strategy',
      component: ContentPreferences,
      icon: MessageSquare,
      color: 'pink'
    },
    {
      title: 'Marketing Goals',
      description: 'Define your objectives',
      component: MarketingGoals,
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Additional Info',
      description: 'Final details',
      component: AdditionalInfo,
      icon: Globe,
      color: 'indigo'
    }
  ];

  const handleNext = async (stepData: any) => {
    try {
      setError(null);
      setIsLoading(true);
      await saveProgress(stepData);

      if (currentStep >= steps.length - 1) {
        // Start analysis when onboarding is complete
        setShowAnalysis(true);
        await updateUser({ ...user!, onboardingCompleted: true });
        
        // Simulate AI analysis time
        setTimeout(() => {
          setAnalysisComplete(true);
        }, 3000);
      } else {
        await goToNextStep();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save progress');
    } finally {
      setIsLoading(false);
    }
  };

  if (showAnalysis) {
    if (!analysisComplete) {
      return <LoadingAnalysis />;
    }
    return <AIAnalysisResults onboardingData={onboardingData} />;
  }

  const CurrentStepComponent = steps[currentStep].component;
  const activeStep = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-${activeStep.color}-50 rounded-lg`}>
                  <activeStep.icon className={`w-6 h-6 text-${activeStep.color}-600`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{activeStep.title}</h1>
                  <p className="text-sm text-gray-500">{activeStep.description}</p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === currentStep
                          ? `bg-${step.color}-600 ring-4 ring-${step.color}-100 text-white`
                          : index < currentStep
                          ? `bg-${step.color}-600 text-white`
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-600 hidden sm:block">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute top-5 left-0 right-0 -z-10">
                <div className="h-[2px] bg-gray-200">
                  <div
                    className={`h-full bg-${activeStep.color}-600 transition-all duration-300`}
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 mt-48">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <CurrentStepComponent
            onNext={handleNext}
            onBack={goToPreviousStep}
            data={onboardingData}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
}

export default OnboardingFlow;