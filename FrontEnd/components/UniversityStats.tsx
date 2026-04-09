"use client";

import Link from "next/link";
import { ScrollText, BookOpen, Calculator, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

const items = [
  {
    href: "/misiones",
    label: "Misiones",
    hint: "Retos y recompensas",
    icon: ScrollText,
  },
  {
    href: "/simulador",
    label: "Simulador",
    hint: "Prueba escenarios",
    icon: Calculator,
  },
  {
    href: "/aprender",
    label: "Aprender",
    hint: "Cápsulas y tips",
    icon: BookOpen,
  },
] as const;

export function UniversityStats() {
  return (
    <div className="relative w-full">
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pr-10 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:pr-0 [&::-webkit-scrollbar]:hidden">
        {items.map(({ href, label, hint, icon: Icon }) => (
          <li key={href} className="min-w-[42%] shrink-0 snap-start sm:min-w-[38%] md:min-w-0">
            <Link
              href={href}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-background p-4 text-center outline-offset-2 transition-colors",
                "hover:border-primary/35 hover:bg-card",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "md:flex-row md:items-center md:gap-4 md:p-4 md:text-left"
              )}
            >
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10 md:size-14">
                <Icon className="size-6 md:size-6" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 md:flex-1">
                <p className="text-sm font-bold tracking-tight text-foreground">
                  {label}
                </p>
                <p className="mt-0.5 hidden text-xs text-muted-foreground md:block">
                  {hint}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Indicador de scroll horizontal (mobile) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center md:hidden"
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background via-background/85 to-transparent" />
        <ChevronRight className="relative size-5 text-muted-foreground" />
      </div>
    </div>
  );
}
