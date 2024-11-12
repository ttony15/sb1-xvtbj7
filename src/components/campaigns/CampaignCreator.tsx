import React, { useState } from 'react';
import WritezAICampaignCreator from './WritezAICampaignCreator';
import CampaignBasics from './steps/CampaignBasics';
import TargetAudience from './steps/TargetAudience';
import BudgetAllocation from './steps/BudgetAllocation';
import CampaignSchedule from './steps/CampaignSchedule';
import CampaignType from './steps/CampaignType';
import CreativeAssets from './steps/CreativeAssets';
import CampaignPreview from './steps/CampaignPreview';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Brain, Pencil, ArrowLeft } from 'lucide-react';

function CampaignCreator() {
  const [creationMode, setCreationMode] = useState<'choose' | 'ai' | 'manual' | null>('choose');
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const steps = [
    { id: 'basics', label: 'Campaign Basics', component: CampaignBasics },
    { id: 'audience', label: 'Target Audience', component: TargetAudience },
    { id: 'budget', label: 'Budget', component: BudgetAllocation },
    { id: 'schedule', label: 'Schedule', component: CampaignSchedule },
    { id: 'type', label: 'Campaign Type', component: CampaignType },
    { id: 'assets', label: 'Creative Assets', component: CreativeAssets },
    { id: 'preview', label: 'Preview', component: CampaignPreview }
  ];

  if (creationMode === 'ai') {
    return <WritezAICampaignCreator onBack={() => setCreationMode('choose')} />;
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCreationMode('choose');
    }
  };

  const CreationModeSelector = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">How would you like to create your campaign?</h2>
        <p className="text-gray-500 mt-2">Choose your preferred creation method</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => setCreationMode('ai')}
          className="relative p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Create with AI</h3>
              <p className="text-sm text-purple-100">AI-powered campaign creation</p>
            </div>
          </div>
          <p className="text-sm text-purple-100 mb-4">
            Let AI help you design and optimize your campaign based on data-driven insights
          </p>
        </button>

        <button
          onClick={() => setCreationMode('manual')}
          className="relative p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pencil className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Create Manually</h3>
              <p className="text-sm text-gray-500">Step-by-step campaign setup</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Create your campaign manually with full control over every aspect
          </p>
        </button>
      </div>
    </div>
  );

  if (creationMode === 'choose') {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-500">Set up your marketing campaign</p>
        </div>
        <CreationModeSelector />
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-8">
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
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
                    {index + 1}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-600">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute top-5 left-0 right-0 -z-10">
              <div className="h-[2px] bg-gray-200">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <CurrentStepComponent register={register} errors={errors} data={watch()} />

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? 'Create Campaign' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignCreator;