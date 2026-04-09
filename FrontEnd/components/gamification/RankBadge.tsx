'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Star, Shield, Trophy, Medal } from 'lucide-react';

type Rank = 'Bronce' | 'Plata' | 'Oro';

interface RankBadgeProps {
  rank: Rank;
  level: number;
}

const rankConfig = {
  Bronce: {
    color: 'from-amber-600 to-amber-800',
    icon: Shield,
    textColor: 'text-amber-100',
    label: 'Bronce',
    shadow: 'shadow-amber-900/20',
  },
  Plata: {
    color: 'from-slate-300 to-slate-500',
    icon: Medal,
    textColor: 'text-slate-100',
    label: 'Plata',
    shadow: 'shadow-slate-500/20',
  },
  Oro: {
    color: 'from-yellow-400 to-yellow-600',
    icon: Trophy,
    textColor: 'text-yellow-100',
    label: 'Oro',
    shadow: 'shadow-yellow-500/20',
  },
};

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, level }) => {
  const config = rankConfig[rank];
  const Icon = config.icon;

  return (
    <div className={cn(
      "relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br shadow-xl transition-all duration-300 hover:scale-105",
      config.color,
      config.shadow
    )}>
      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
        <span className="text-white font-bold text-sm">Lvl {level}</span>
      </div>
      
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
        <Icon className={cn("w-10 h-10", config.textColor)} />
      </div>
      
      <span className={cn("font-bold text-lg uppercase tracking-wider", config.textColor)}>
        Rango {config.label}
      </span>
      
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4", 
              i < (rank === 'Bronce' ? 1 : rank === 'Plata' ? 2 : 3) 
                ? "fill-white text-white" 
                : "text-white/30"
            )} 
          />
        ))}
      </div>
    </div>
  );
};
