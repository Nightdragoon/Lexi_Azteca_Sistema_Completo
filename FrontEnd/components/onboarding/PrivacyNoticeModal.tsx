'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-background/95 backdrop-blur-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 mx-auto">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">Aviso de Privacidad</DialogTitle>
          <DialogDescription className="text-center pt-2">
            En Lexi, protegemos tus datos financieros con los más altos estándares de seguridad.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground max-h-[200px] overflow-y-auto pr-2">
          <p className="mb-4">
            Al utilizar nuestra plataforma, aceptas que recolectemos y procesemos información sobre tus metas y hábitos financieros para ofrecerte una experiencia personalizada.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Tus datos bancarios están cifrados de extremo a extremo.</li>
            <li>No compartimos tu información con terceros sin tu consentimiento explícito.</li>
            <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
          </ul>
        </div>
        <div className="flex items-center space-x-2 pt-2 pb-4">
          <input
            type="checkbox"
            id="privacy-accept"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
          />
          <label
            htmlFor="privacy-accept"
            className="text-sm font-medium leading-none cursor-pointer select-none"
          >
            Acepto el Aviso de Privacidad y los Términos de Servicio.
          </label>
        </div>
        <DialogFooter>
          <Button
            onClick={onAccept}
            disabled={!checked}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            Continuar al Onboarding
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Placeholder Dialog components since they are not in components/ui yet
// In a real shadcn project, these would be in components/ui/dialog.tsx
