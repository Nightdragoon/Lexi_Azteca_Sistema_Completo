"use client";
import { useSimulationStore } from "@/store/useSimulationStore";
import { Card, CardContent } from "@/components/ui/card";

export function HealthIndicator() {
  const { healthScore, antExpensesStatus } = useSimulationStore();
  
  const statusText = healthScore > 80 ? 'Óptima' : healthScore > 50 ? 'Regular' : 'Peligro';
  const statusColorUrl = healthScore > 80 ? '#22c55e' : healthScore > 50 ? '#f59e0b' : '#ef4444';

  const radius = 60;
  // Perímetro del círculo
  const circumference = 2 * Math.PI * radius; 
  // Cálculo del progreso
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <Card className="relative mb-0 overflow-hidden border-border shadow-md md:h-full">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      
      <CardContent className="flex flex-col items-center p-6 pt-6 md:h-full md:justify-center">
        <h3 className="text-muted-foreground font-semibold text-sm mb-6 uppercase tracking-wider">Salud Financiera</h3>
        
        {/* Aquí integramos el ejemplo del usuario con ajustes visuales para la UI actual */}
        <div className="relative flex items-center justify-center w-40 h-40">
          {/* SVG rotado para que el progreso empiece desde arriba */}
          <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90 drop-shadow-xl">
            {/* Círculo de fondo */}
            <circle
              cx="80" cy="80" r={radius}
              stroke="var(--secondary)" strokeWidth="12" fill="transparent"
            />
            {/* Círculo de progreso */}
            <circle
              cx="80" cy="80" r={radius}
              stroke={statusColorUrl} strokeWidth="12" fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          
          {/* Texto central adaptado a lo que ya tenías */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-foreground tracking-tighter">
              {healthScore}
              <span className="text-2xl text-muted-foreground">%</span>
            </span>
            <span className="text-[10px] text-primary uppercase tracking-widest font-bold mt-1 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              {statusText}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-foreground/80 text-center mt-6 max-w-[220px] font-medium leading-relaxed">
          Vas por buen camino. Estado de gastos hormiga:{' '}
          <span className="text-primary font-semibold">{antExpensesStatus}</span>.
        </p>
      </CardContent>
    </Card>
  );
}
