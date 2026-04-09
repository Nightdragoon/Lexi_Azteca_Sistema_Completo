'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/utils/cn';
import { Trophy } from 'lucide-react';

interface GoalProgressBarProps {
  current: number;
  total: number;
  label: string;
  unit?: string;
}

export const GoalProgressBar: React.FC<GoalProgressBarProps> = ({
  current,
  total,
  label,
  unit = '$',
}) => {
  const percentage = Math.min(100, (current / total) * 100);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{label}</h3>
            <p className="text-sm text-muted-foreground">
              {percentage.toFixed(0)}% completado
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary">
            {unit}{current.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground block">
            de {unit}{total.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="relative pt-2">
        <Progress value={percentage} className="h-3 bg-muted" />
        <div 
          className="absolute top-0 flex flex-col items-center transition-all duration-500"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-1 h-3 bg-primary rounded-full mb-1" />
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
        <span>Inicio</span>
        <span>Meta</span>
      </div>
    </div>
  );
};
