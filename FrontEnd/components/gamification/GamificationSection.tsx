'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { GoalProgressBar } from './GoalProgressBar';
import { RankBadge } from './RankBadge';
import { AchievementModal } from './AchievementModal';
import { Button } from '@/components/ui/button';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const GamificationSection: React.FC = () => {
  const { xp, level, rank, achievements } = useAppStore();
  const [isAchievementOpen, setIsAchievementOpen] = useState(false);
  
  // Mock goal for demonstration
  const [mockGoal, setMockGoal] = useState({
    current: 12500,
    total: 20000,
    label: 'Meta de Ahorro: Viaje 2026',
  });

  const nextLevelXP = 500 * level;
  const progressToNextLevel = (xp % 500) / 5;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Tu Progreso
        </h2>
        <Link href="/ranking">
          <Button variant="ghost" size="sm" className="text-primary font-bold ">
            Ver todos <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RankBadge rank={rank} level={level} />
        
        <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Nivel {level}</span>
              <span className="text-sm font-bold text-primary">{xp} / {nextLevelXP} XP</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextLevel}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Último logro:</p>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-bold text-sm">Explorador del Tesoro</p>
                <p className="text-xs text-muted-foreground">Conecta tu cuenta bancaria</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoalProgressBar 
        current={mockGoal.current} 
        total={mockGoal.total} 
        label={mockGoal.label} 
      />

      <AchievementModal 
        isOpen={isAchievementOpen} 
        onClose={() => setIsAchievementOpen(false)}
        title="Maestro del Ahorro"
        description="Has mantenido tu racha de ahorro por 30 días consecutivos. ¡Increíble disciplina!"
        reward="Minicurso: Inversiones 101"
        icon="💎"
      />
      
      {/* Button to trigger modal for demo purposes */}
      <Button 
        variant="outline" 
        onClick={() => setIsAchievementOpen(true)}
        className="dashed border-primary/40 text-primary py-6 rounded-2xl"
      >
        <Star className="w-4 h-4 mr-2" />
        Simular nuevo logro
      </Button>
    </div>
  );
};
