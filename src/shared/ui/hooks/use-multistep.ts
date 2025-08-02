import { useState, useCallback} from 'react';
import { z } from 'zod';

export type StepMetadata = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ComponentType<any>;
};

export type MultiStepConfig<T = any> = {
  steps: Array<{
    metadata: StepMetadata;
    schema: z.ZodSchema<any>;
    defaultValues?: Partial<T>;
  }>;
  onSubmit?: (data: T) => void | Promise<void>;
  onStepChange?: (currentStep: number, direction: 'next' | 'prev') => void;
};

export type MultiStepFormState<T = any> = {
  // Navigation
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  
  // Data Management
  formData: Partial<T>;
  stepData: Record<string, any>;
  
  // Validation
  stepValidity: boolean[];
  isCurrentStepValid: boolean;
  canProceed: boolean;
  canSubmit: boolean;
  
  // Actions
  next: () => void;
  prev: () => void;
  goToStep: (step: number) => void;
  updateStepData: (stepId: string, data: any) => void;
  updateStepValidity: (stepIndex: number, isValid: boolean) => void;
  validateCurrentStep: () => boolean;
  reset: () => void;
  submit: () => void;
  
  // Current Step Info
  currentStepMetadata: StepMetadata;
  currentStepSchema: z.ZodSchema<any>;
};

export function useMultiStepForm<T = Record<string, any>>(
  config: MultiStepConfig<T>
): MultiStepFormState<T> {
  const { steps, onSubmit, onStepChange } = config;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [stepValidity, setStepValidity] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [stepData, setStepData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    steps.forEach((step) => {
      initialData[step.metadata.id] = step.defaultValues || {};
    });
    return initialData;
  });

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepMetadata = steps[currentStep]?.metadata;
  const currentStepSchema = steps[currentStep]?.schema;
  const isCurrentStepValid = stepValidity[currentStep];
  const canProceed = isCurrentStepValid;
  const canSubmit = stepValidity.every(Boolean) && isLastStep;

  // Aggregate all step data into final form data
  const formData = Object.values(stepData).reduce((acc, data) => ({
    ...acc,
    ...data
  }), {}) as Partial<T>;

  // Update step data
  const updateStepData = useCallback((stepId: string, data: any) => {
    setStepData(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], ...data }
    }));
  }, []);

  // Update step validity
  const updateStepValidity = useCallback((stepIndex: number, isValid: boolean) => {
    setStepValidity(prev => {
      const newValidity = [...prev];
      newValidity[stepIndex] = isValid;
      return newValidity;
    });
  }, []);

  // Validate current step using Zod schema
  const validateCurrentStep = useCallback(() => {
    try {
      const currentData = stepData[currentStepMetadata.id] || {};
      currentStepSchema.parse(currentData);
      updateStepValidity(currentStep, true);
      return true;
    } catch (error) {
      updateStepValidity(currentStep, false);
      return false;
    }
  }, [currentStep, currentStepMetadata, currentStepSchema, stepData, updateStepValidity]);

  // Navigation functions
  const next = useCallback(() => {
    if (canProceed && !isLastStep) {
      const newStep = Math.min(currentStep + 1, totalSteps - 1);
      setCurrentStep(newStep);
      onStepChange?.(newStep, 'next');
    }
  }, [canProceed, isLastStep, currentStep, totalSteps, onStepChange]);

  const prev = useCallback(() => {
    if (!isFirstStep) {
      const newStep = Math.max(currentStep - 1, 0);
      setCurrentStep(newStep);
      onStepChange?.(newStep, 'prev');
    }
  }, [isFirstStep, currentStep, onStepChange]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      onStepChange?.(step, step > currentStep ? 'next' : 'prev');
    }
  }, [totalSteps, currentStep, onStepChange]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setStepValidity(new Array(steps.length).fill(false));
    const resetData: Record<string, any> = {};
    steps.forEach((step) => {
      resetData[step.metadata.id] = step.defaultValues || {};
    });
    setStepData(resetData);
  }, [steps]);

  const submit = useCallback(async () => {
    if (canSubmit && onSubmit) {
      await onSubmit(formData as T);
    }
  }, [canSubmit, onSubmit, formData]);


  return {
    // Navigation
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    
    // Data Management
    formData,
    stepData,
    
    // Validation
    stepValidity,
    isCurrentStepValid,
    canProceed,
    canSubmit,
    
    // Actions
    next,
    prev,
    goToStep,
    updateStepData,
    updateStepValidity,
    validateCurrentStep,
    reset,
    submit,
    
    // Current Step Info
    currentStepMetadata,
    currentStepSchema,
  };
}