"use client";

import { Header } from "@/components/Header";
import { BancoAztecaSimulador } from "@/components/simulador/BancoAztecaSimulador";

export default function SimuladorPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#e4eaf0] text-foreground selection:bg-primary/20">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(100%_70%_at_50%_-15%,rgba(23,165,77,0.12),transparent_58%),radial-gradient(70%_50%_at_100%_20%,rgba(245,158,11,0.07),transparent_55%),linear-gradient(165deg,#f8fafc_0%,#e2e8f0_55%,#dbe4ec_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-size-[56px_56px] bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] opacity-40"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-full flex-col">
        <div className="flex min-h-dvh flex-1 flex-col overflow-hidden bg-background/82 shadow-[0_28px_90px_-36px_rgba(15,23,42,0.28)] ring-1 ring-black/6 backdrop-blur-2xl sm:mx-auto sm:my-3 sm:min-h-[calc(100dvh-1.5rem)] sm:max-w-xl sm:rounded-[1.75rem] lg:mx-0 lg:my-0 lg:max-w-none lg:rounded-none lg:shadow-none lg:ring-0">
          <main
            id="simulador-main"
            className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto pb-32 [-ms-overflow-style:none] [scrollbar-width:none] sm:pb-36 lg:pb-10 [&::-webkit-scrollbar]:hidden"
          >
            <div className="overflow-hidden sm:rounded-t-[1.75rem] lg:rounded-none">
              <Header />
            </div>
            <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
              <BancoAztecaSimulador />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
