'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';

interface Option {
  id: string;
  label: string;
  value: string;
  routeHint?: string;
}

interface QuestionCardProps {
  title: string;
  description?: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  description,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="text-center pb-8 p-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.value)}
            className={cn(
              "w-full p-4 rounded-2xl text-left transition-all duration-300 border-2",
              selectedValue === option.value
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-muted hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-base font-semibold",
                selectedValue === option.value ? "text-primary" : "text-foreground"
              )}>
                {option.label}
              </span>
              {selectedValue === option.value && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </div>
            {option.routeHint && (
              <p
                className={cn(
                  "mt-2 text-sm",
                  selectedValue === option.value
                    ? "text-primary/90"
                    : "text-muted-foreground"
                )}
              >
                {option.routeHint}
              </p>
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
