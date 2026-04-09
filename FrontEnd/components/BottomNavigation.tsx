"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Calculator,
  Home,
  LogOut,
  Plug,
  Target,
  Trophy,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store/useAppStore";
import { useSimulationStore } from "@/store/useSimulationStore";

export type BottomNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** Rutas principales de la app (mismo conjunto en todas las pantallas con barra inferior). */
export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  // { href: "/aprender", label: "Aprender", icon: BookOpen },
  { href: "/simulador", label: "Simulador", icon: Calculator },
  { href: "/misiones", label: "Misiones", icon: Target },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/notifications", label: "Alertas", icon: Bell },
  { href: "/integrations", label: "Config", icon: Plug },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNavigation({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAppStore((s) => s.logout);
  const setUserName = useSimulationStore((s) => s.setUserName);

  const handleLogout = () => {
    logout();
    setUserName(null);
    router.push("/login");
  };

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md lg:hidden",
        className
      )}
    >
      <div className="mx-auto flex max-w-[800px] items-stretch justify-between gap-0.5 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-[3.25rem] flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold leading-tight transition-colors sm:text-xs",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "bg-transparent text-current"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.25 : 2} />
              </span>
              <span className="max-w-full truncate px-0.5 text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
