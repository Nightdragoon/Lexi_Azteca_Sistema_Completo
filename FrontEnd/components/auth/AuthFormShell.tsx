"use client";

import { GraduationCap, Trophy, Zap } from "lucide-react";

type AuthFormShellProps = {
  heroHeadline: React.ReactNode;
  heroSubline: string;
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
};

export function AuthFormShell({
  heroHeadline,
  heroSubline,
  cardTitle,
  cardDescription,
  children,
}: AuthFormShellProps) {
  return (
    <div className="min-h-screen flex bg-background sm:bg-muted font-sans text-foreground selection:bg-primary/30">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#17a54d] overflow-hidden flex-col justify-between p-12 lg:p-20 text-white shadow-[inset_-20px_0_40px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#22c55e] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-[#10b981] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col gap-8 max-w-lg mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-max text-sm font-medium shadow-xl">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-emerald-50 tracking-wide">
              Simulador de Supervivencia Financiera
            </span>
          </div>

          <h1 className="text-6xl font-extrabold tracking-tight leading-[1.1]">
            {heroHeadline}
          </h1>

          <p className="text-xl text-emerald-50/90 leading-relaxed font-light">
            {heroSubline}
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15 group cursor-default">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Zap className="w-7 h-7 text-[#064e3b]" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-white">
                ¿Sabías qué?
              </h3>
              <p className="text-base text-emerald-50/90 leading-relaxed">
                El <strong>60% de los universitarios</strong> declara que el
                estrés financiero afecta su rendimiento académico. Conviértete
                en el 40% restante tomando el control.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background relative">
        <div className="lg:hidden absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#17a54d]/20 to-transparent z-0 pointer-events-none"></div>

        <div className="w-full max-w-md space-y-8 relative z-10 bg-card p-10 rounded-[2rem] sm:shadow-2xl sm:border border-border/50 transition-all">
          <div className="text-center space-y-3">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              {cardTitle}
            </h2>
            <p className="text-muted-foreground text-base">{cardDescription}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
