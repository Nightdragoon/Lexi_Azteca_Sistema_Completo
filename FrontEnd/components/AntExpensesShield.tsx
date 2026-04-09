"use client";
import { useSimulationStore } from "@/store/useSimulationStore";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, ShieldAlert, AlertTriangle } from "lucide-react";

export function AntExpensesShield() {
  const { antExpensesStatus } = useSimulationStore();

  const statusConfig = {
    Secure: { 
      color: "text-accent", 
      bg: "bg-accent/10", 
      border: "border-accent", 
      iconBg: "bg-accent",
      text: "Protegido", 
      icon: Shield, 
      msg: "Escudo 100% activo. ¡Sin fugas de dinero!" 
    },
    Warning: { 
      color: "text-amber-500", 
      bg: "bg-amber-500/10", 
      border: "border-amber-500", 
      iconBg: "bg-amber-500",
      text: "Alerta Media", 
      icon: AlertTriangle, 
      msg: "Se detectó actividad sospechosa (ej. antojos frecuentes)." 
    },
    Breached: { 
      color: "text-destructive", 
      bg: "bg-destructive/10", 
      border: "border-destructive", 
      iconBg: "bg-destructive",
      text: "Escudo Roto", 
      icon: ShieldAlert, 
      msg: "Gastos hormiga fuera de control. Revisa tu presupuesto de inmediato." 
    },
  };

  // Safe fallback if status doesn't match
  const config = statusConfig[antExpensesStatus] || statusConfig.Secure;
  const Icon = config.icon;

  return (
    <Card className={`relative overflow-hidden border-2 ${config.border} shadow-lg transition-all duration-300`}>
      <div className={`absolute -inset-4 ${config.bg} blur-2xl opacity-50`}></div>
      <CardContent className="relative p-6 z-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground/70 mb-4">
          Escudo contra Gastos Hormiga
        </h2>
        
        <div className={`p-4 rounded-full ${config.bg} ${config.border} border-2 mb-4 animate-in zoom-in spin-in-12`}>
          <Icon size={48} className={config.color} strokeWidth={2.5} />
        </div>
        
        <h3 className={`text-2xl font-black ${config.color} uppercase tracking-tight`}>
          {config.text}
        </h3>
        
        <p className="mt-2 text-sm text-foreground/80 font-medium px-4">
          {config.msg}
        </p>

        <div className="w-full mt-5 bg-background border border-border h-2 rounded-full overflow-hidden">
             <div className={`h-full ${config.iconBg} ${antExpensesStatus === 'Secure' ? 'w-full' : antExpensesStatus === 'Warning' ? 'w-1/2' : 'w-1/12'} transition-all duration-1000`}></div>
        </div>
      </CardContent>
    </Card>
  );
}
