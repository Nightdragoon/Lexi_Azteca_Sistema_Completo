'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  reward?: string;
  icon?: string;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  reward,
  icon = '🏆',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] border-none bg-gradient-to-b from-primary/10 to-background backdrop-blur-xl">
        <DialogHeader className="items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative"
          >
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-pulse" />
            <span className="text-5xl">{icon}</span>
          </motion.div>
          <DialogTitle className="text-2xl font-bold text-primary">¡Hito Alcanzado!</DialogTitle>
          <DialogDescription className="text-lg font-semibold text-foreground mt-2">
            {title}
          </DialogDescription>
        </DialogHeader>
        
        <div className=" py-4 text-center">
          <p className="text-muted-foreground">{description}</p>
          {reward && (
            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-xs uppercase tracking-wider font-bold text-primary mb-1">Tu Recompensa</p>
              <p className="font-bold text-foreground">{reward}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-2xl transition-all shadow-lg shadow-primary/20"
          >
            ¡Genial!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
