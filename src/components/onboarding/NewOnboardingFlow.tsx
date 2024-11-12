import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyInfoStep from './steps/CompanyInfoStep';
import AIResearchStep from './steps/AIResearchStep';
import GoalsStrategyStep from './steps/GoalsStrategyStep';
import GeneratingStrategyStep from './steps/GeneratingStrategyStep';
import { Layout } from 'lucide-react';

type OnboardingStep = 'initial' | 'research' | 'goals' | 'generating';

function NewOnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('initial');
  const [companyData, setCompanyData] = useState<any>(null);
  const [researchData, setResearchData] = useState<any>(null);
  const [strategyData, setStrategyData] = useState<any>(null);

  const handleCompanyInfoSubmit = async (data: any) => {
    try {
      setCompanyData(data);
      setCurrentStep('research');
    } catch (error) {
      console.error('Error saving company info:', error);
    }
  };

  const handleResearchComplete = async (data: any) => {
    try {
      setResearchData(data);
      setCurrentStep('goals');
    } catch (error) {
      console.error('Error completing research:', error);
    }
  };

  const handleGoalsSubmit = async (data: any) => {
    try {
      const completeStrategyData = {
        company: companyData,
        research: researchData,
        goals: data
      };
      setStrategyData(completeStrategyData);
      setCurrentStep('generating');
    } catch (error) {
      console.error('Error generating strategy:', error);
      setCurrentStep('goals');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Marketing Strategy Setup</h1>
              <p className="text-sm text-gray-500">Let's create your personalized marketing strategy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 'initial' && (
          <CompanyInfoStep onSubmit={handleCompanyInfoSubmit} />
        )}

        {currentStep === 'research' && (
          <AIResearchStep 
            companyData={companyData} 
            onComplete={handleResearchComplete} 
          />
        )}

        {currentStep === 'goals' && (
          <GoalsStrategyStep
            companyData={companyData}
            researchData={researchData}
            onSubmit={handleGoalsSubmit}
          />
        )}

        {currentStep === 'generating' && (
          <GeneratingStrategyStep strategyData={strategyData} />
        )}
      </div>
    </div>
  );
}

export default NewOnboardingFlow;