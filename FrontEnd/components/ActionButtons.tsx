"use client";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useSimulationStore } from "@/store/useSimulationStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  const { activeMissions, completeMission } = useSimulationStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="border-t border-border pt-4">
        <h3 className="text-base font-semibold text-foreground">
          Descubre más
        </h3>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activeMissions.length > 0 ? (
          activeMissions.map((mission) => (
            <Card key={mission.id} className="min-w-[260px] p-5 border-border/50 hover:bg-muted/30 transition shrink-0">
              <h3 className="text-foreground font-semibold text-sm tracking-tight mb-2">
                Misión: {mission.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
                {mission.description}
              </p>
              <div className="flex flex-col gap-2">
                {mission.options.map((opt, idx) => (
                  <Button 
                    key={idx} 
                    variant="secondary" 
                    className="justify-between w-full hover:bg-accent hover:text-white transition-colors text-xs py-4 px-3"
                    onClick={() => completeMission(mission.id, idx)}
                  >
                    <span className="truncate">{opt.label}</span>
                    <ChevronRight size={14} className="opacity-50" />
                  </Button>
                ))}
              </div>
            </Card>
          ))
        ) : (
          <Card className="min-w-[260px] p-5 border-border bg-muted/20 flex flex-col items-start justify-center shrink-0">
            <h3 className="text-foreground font-semibold text-sm">Todo al día</h3>
            <p className="text-muted-foreground text-xs mt-1 mb-4">
              Te avisaremos por WhatsApp cuando haya nuevas decisiones.
            </p>
            <Button variant="outline" size="sm" className="w-full text-xs">
              Ver Historial
            </Button>
          </Card>
        )}

        <Card className="min-w-[260px] p-5 border-border/50 hover:bg-muted/30 transition shrink-0 bg-primary/5 cursor-pointer">
          <h3 className="text-primary font-semibold text-sm tracking-tight mb-2">
            Aprende un Glosario Corto
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed mb-4">
            ¿Qué es el CAT verdadero? Descúbrelo rápido.
          </p>
          <div className="bg-primary text-white text-xs py-2 px-3 rounded-lg w-auto inline-flex items-center gap-2 font-medium mt-auto">
            Leer <ExternalLink size={12}/>
          </div>
        </Card>
      </div>
    </div>
  );
}
