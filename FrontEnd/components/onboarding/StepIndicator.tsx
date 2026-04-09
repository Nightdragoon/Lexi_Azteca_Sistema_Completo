'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1.5 transition-all duration-500 rounded-full",
            index === currentStep 
              ? "w-8 bg-primary" 
              : index < currentStep 
                ? "w-4 bg-primary/40" 
                : "w-4 bg-muted"
          )}
        />
      ))}
    </div>
  );
};
