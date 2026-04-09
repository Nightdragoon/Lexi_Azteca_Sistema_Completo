'use client';

import React from 'react';
import { AlertCircle, ShieldAlert, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export const WhatsAppCallout: React.FC = () => {
  return (
    <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 flex gap-4">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <ShieldAlert className="w-5 h-5 text-amber-600" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-amber-900">Nota sobre seguridad</h4>
          <div className="group relative">
            <Info className="w-3.5 h-3.5 text-amber-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              WhatsApp no cumple con nuestros protocolos de encriptación end-to-end para datos bancarios sensibles.
            </div>
          </div>
        </div>
        <p className="text-xs text-amber-800/80 leading-relaxed">
          Para garantizar la máxima seguridad en tus transacciones e informes detallados, Lexi utiliza canales dedicados y encriptados (SMS/Telegram). <strong>No utilizamos WhatsApp</strong> para el envío de alertas financieras críticas debido a limitaciones en su arquitectura de seguridad corporativa.
        </p>
      </div>
    </div>
  );
};
