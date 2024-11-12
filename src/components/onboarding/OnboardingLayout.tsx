import React from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { ONBOARDING_STEPS, STEP_TITLES, STEP_DESCRIPTIONS } from '../../types/onboarding';
import { Building, Sparkles, Users, MessageSquare, Target, Info } from 'lucide-react';

const STEP_ICONS = {
  companyProfile: Building,
  brandVoice: Sparkles,
  targetAudience: Users,
  contentPreferences: MessageSquare,
  marketingGoals: Target,
  additionalInfo: Info
};

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { currentStep, totalSteps, error } = useOnboarding();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {React.createElement(STEP_ICONS[ONBOARDING_STEPS[currentStep]], {
                    className: 'w-6 h-6 text-blue-600'
                  })}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {STEP_TITLES[ONBOARDING_STEPS[currentStep]]}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {STEP_DESCRIPTIONS[ONBOARDING_STEPS[currentStep]]}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {totalSteps}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="flex justify-between mb-2">
                {ONBOARDING_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === currentStep
                          ? 'bg-blue-600 ring-4 ring-blue-100 text-white'
                          : index < currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {React.createElement(STEP_ICONS[step], { className: 'w-5 h-5' })}
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-600 hidden sm:block">
                      {STEP_TITLES[step]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute top-5 left-0 right-0 -z-10">
                <div className="h-[2px] bg-gray-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${(currentStep / (totalSteps - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 mt-48">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600">
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default OnboardingLayout;