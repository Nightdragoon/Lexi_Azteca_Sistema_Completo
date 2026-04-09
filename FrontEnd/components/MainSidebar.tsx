"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bolt, Shield } from "lucide-react";
import appIcon from "@/app/icon.png";
import { BOTTOM_NAV_ITEMS } from "@/components/BottomNavigation";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store/useAppStore";
import { useSimulationStore } from "@/store/useSimulationStore";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MainSidebar() {
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
    <aside
      aria-label="Navegación principal escritorio"
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/80 bg-card/95 shadow-[4px_0_24px_-12px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex"
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-border/60 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md shadow-primary/20 ring-2 ring-primary/20">
              <Image
                src={appIcon}
                alt=""
                width={44}
                height={44}
                className="size-full object-cover"
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight text-foreground">
                Lexi Campus
              </p>
              <p className="truncate text-[11px] font-medium text-muted-foreground">
                Banco Azteca
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Shield className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span>Educación financiera segura</span>
          </p>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-[background-color,color,transform] duration-200",
                  active
                    ? "bg-primary/12 text-primary shadow-sm ring-1 ring-primary/15"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active ? "bg-primary/15 text-primary" : "bg-muted/50 text-current"
                  )}
                >
                  <Icon className="size-4.5" strokeWidth={active ? 2.25 : 2} />
                </span>
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 px-3 py-4">
          <button type="button" onClick={handleLogout} className="mt-3 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Bolt className="size-4.5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </aside>
  );
}
