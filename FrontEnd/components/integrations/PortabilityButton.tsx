'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { ArrowRightLeft, MoveRight } from 'lucide-react';

interface PortabilityButtonProps {
  name: string;
  provider: 'Belvo' | 'Finerio';
  onClick: () => void;
}

export const PortabilityButton: React.FC<PortabilityButtonProps> = ({
  name,
  provider,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full p-5 rounded-2xl bg-gradient-to-r transition-all duration-300 transform active:scale-[0.98]",
        provider === 'Belvo' 
          ? "from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/10" 
          : "from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-500/10"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Portabilidad</p>
            <h4 className="font-bold text-lg">{name}</h4>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MoveRight className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
};
