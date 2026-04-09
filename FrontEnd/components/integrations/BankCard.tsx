'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { CheckCircle2, Link2, AlertCircle, Loader2 } from 'lucide-react';

interface BankCardProps {
  name: string;
  logo?: string;
  connected: boolean;
  onConnect: () => void;
  onDisconnect?: () => void;
  isConnecting?: boolean;
  provider: string;
  disabled?: boolean;
}

export const BankCard: React.FC<BankCardProps> = ({
  name,
  logo,
  connected,
  onConnect,
  onDisconnect,
  isConnecting,
  provider,
  disabled,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border-border/50",
      connected ? "bg-primary/5 border-primary/20" : "bg-card hover:border-primary/30",
      disabled && "opacity-50 grayscale pointer-events-none"
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl",
              connected ? "bg-white border-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {logo || name[0]}
            </div>
            <div>
              <h3 className="font-bold text-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">{provider}</p>
            </div>
          </div>
          {connected ? (
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="bg-muted text-muted-foreground p-2 rounded-full">
              <Link2 className="w-5 h-5" />
            </div>
          )}
        </div>

        {connected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Cuenta vinculada con éxito
            </div>
            <Button
              variant="outline"
              onClick={onDisconnect}
              className="w-full rounded-xl border-destructive/20 text-destructive hover:bg-destructive/5"
            >
              Desconectar
            </Button>
          </div>
        ) : (
          <Button
            onClick={onConnect}
            disabled={isConnecting || disabled}
            className={cn(
              "w-full py-6 rounded-xl font-bold transition-all shadow-lg shadow-primary/10",
              "bg-primary hover:bg-primary/90 text-white"
            )}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Conectando...
              </>
            ) : disabled ? (
              'Próximamente'
            ) : (
              'Conectar cuenta'
            )}
          </Button>
        )}
      </div>
      
      {!connected && !disabled && (
        <div className="px-6 py-3 bg-muted/30 border-t border-border/10 flex items-center gap-2">
          <AlertCircle className="w-3 h-3 text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground leading-tight">
            Tus credenciales nunca se almacenan. Conexión segura vía {provider}.
          </p>
        </div>
      )}
    </Card>
  );
};
