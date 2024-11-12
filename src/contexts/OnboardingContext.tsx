import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingData, OnboardingStep } from '../types/onboarding';

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  onboardingData: Partial<OnboardingData>;
  saveProgress: (stepData: Partial<OnboardingData>) => Promise<void>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  completeOnboarding: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const TOTAL_STEPS = 6;

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProgress = useCallback(async (stepData: Partial<OnboardingData>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedData = {
        ...onboardingData,
        ...stepData
      };

      // Here you would typically save to your backend
      // await api.post('/onboarding/progress', updatedData);
      
      setOnboardingData(updatedData);
    } catch (error) {
      setError('Failed to save progress. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onboardingData]);

  const goToNextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const completeOnboarding = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Here you would typically save the final data and mark onboarding as complete
      // await api.post('/onboarding/complete', onboardingData);
      
      navigate('/', { replace: true });
    } catch (error) {
      setError('Failed to complete onboarding. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [onboardingData, navigate]);

  const value = {
    currentStep,
    totalSteps: TOTAL_STEPS,
    onboardingData,
    saveProgress,
    goToNextStep,
    goToPreviousStep,
    completeOnboarding,
    isLoading,
    error
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}