import type { ComponentType } from "react";
import { Header } from "@/components/Header";
import { HealthIndicator } from "@/components/HealthIndicator";
import { UniversityStats } from "@/components/UniversityStats";
import { RankingWidget } from "@/components/RankingWidget";
import { GamificationSection } from "@/components/gamification/GamificationSection";
import { Footer } from "@/components/Footer";
import {
  ShieldCheck,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  Trophy,
} from "lucide-react";

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
              <Icon className="size-5" strokeWidth={2.25} aria-hidden />
            </span>
          )}
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <span
            aria-hidden
            className="mt-4 block h-1 w-16 rounded-full bg-linear-to-r from-primary to-amber-400"
          />
        </div>
      </div>

      {description && (
        <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-sm lg:text-right">
          {description}
        </p>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#e4eaf0] text-foreground selection:bg-primary/20">
      {/* Capas de ambiente: confianza (verde institucional) + energía juvenil (ámbar suave) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(100%_70%_at_50%_-15%,rgba(23,165,77,0.12),transparent_58%),radial-gradient(70%_50%_at_100%_20%,rgba(245,158,11,0.07),transparent_55%),linear-gradient(165deg,#f8fafc_0%,#e2e8f0_55%,#dbe4ec_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-size-[56px_56px] bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] opacity-40"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-full flex-col">
        {/* Móvil: tarjeta tipo app; escritorio: lienzo ancho alineado al max-w-7xl */}
        <div className="flex min-h-dvh flex-1 flex-col overflow-hidden bg-background/82 shadow-[0_28px_90px_-36px_rgba(15,23,42,0.28)] ring-1 ring-black/6 backdrop-blur-2xl sm:mx-auto sm:my-3 sm:min-h-[calc(100dvh-1.5rem)] sm:max-w-xl sm:rounded-[1.75rem] lg:mx-0 lg:my-0 lg:max-w-none lg:rounded-none lg:shadow-none lg:ring-0">
          <main
            id="dashboard-main"
            className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto pb-32 [-ms-overflow-style:none] [scrollbar-width:none] sm:pb-36 lg:pb-10 [&::-webkit-scrollbar]:hidden"
          >
            <div className="overflow-hidden sm:rounded-t-[1.75rem] lg:rounded-none">
              <Header />
            </div>

            <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-10 xl:px-8">
              {/* 1. Panorama: salud + ranking — móvil apilado; md 2 columnas; lg proporción 5/7 */}
              <section
                aria-labelledby="dash-resumen-heading"
                className="space-y-5 motion-safe:scroll-mt-4 lg:space-y-6"
              >
                <SectionHeading
                  eyebrow="Tu panorama"
                  title="Cómo vas hoy"
                  description="Un vistazo claro a tu salud financiera y tu lugar en la comunidad."
                  icon={TrendingUp}
                />
                <h3 id="dash-resumen-heading" className="sr-only">
                  Resumen de salud financiera y ranking
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
                  <div className="md:max-lg:col-span-1 lg:col-span-5 lg:flex lg:flex-col">
                    <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.995] lg:flex-1">
                      <HealthIndicator />
                    </div>
                  </div>
                  <div className="md:max-lg:col-span-1 lg:col-span-7 lg:flex lg:flex-col">
                    <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.005] motion-safe:active:scale-[0.995] lg:flex-1 lg:[&_a]:h-full">
                      <RankingWidget />
                    </div>
                  </div>
                </div>
              </section>

              <div
                className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
                aria-hidden
              />

              {/* 2. Atajos — carrusel en móvil; grid 3 columnas desde md */}
              <section
                aria-labelledby="dash-atajos-heading"
                className="space-y-5 rounded-2xl border border-border/60 bg-card/50 p-4 shadow-sm ring-1 ring-black/4 backdrop-blur-sm transition-shadow duration-300 motion-safe:hover:shadow-md sm:space-y-6 sm:rounded-3xl sm:p-6 lg:p-8"
              >
                <SectionHeading
                  eyebrow="Accesos rápidos"
                  title="Lo que más usas"
                  icon={LayoutGrid}
                />
                <h3 id="dash-atajos-heading" className="sr-only">
                  Herramientas frecuentes
                </h3>
                <UniversityStats />
              </section>

              <div
                className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
                aria-hidden
              />

              {/* 3. Gamificación — bloque protagonista con acento juvenil contenido */}
              <section
                aria-labelledby="dash-progreso-heading"
                className="space-y-5 rounded-2xl border border-border/70 bg-linear-to-br from-primary/6 via-background/90 to-amber-400/7 p-4 shadow-sm ring-1 ring-primary/10 transition-[box-shadow,transform] duration-300 motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/5 sm:space-y-6 sm:rounded-3xl sm:p-6 lg:p-8"
              >
                <SectionHeading
                  eyebrow="Progreso"
                  title="Tu camino en Lexi"
                  description="Metas, logros y recompensas para mantener el hábito sin saturar la pantalla."
                  icon={Trophy}
                />
                <h3 id="dash-progreso-heading" className="sr-only">
                  Progreso y gamificación
                </h3>
                <GamificationSection />
              </section>
            </div>

            <Footer className="mt-auto border-t border-border/40 bg-muted/20 px-4 sm:px-6 xl:px-8" />
          </main>
        </div>
      </div>
    </div>
  );
}
