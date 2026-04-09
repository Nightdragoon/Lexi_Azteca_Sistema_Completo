"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, MessageCircle, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TELEGRAM_URL = "https://t.me/lexiazteca_bot";

/** Rutas sin barra inferior fija: la burbuja puede pegar a la esquina. */
function isCompactChromePath(pathname: string | null) {
  if (!pathname) return true;
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname === "/onboarding" ||
    pathname.startsWith("/onboarding/")
  );
}

function isAuthChromePath(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/")
  );
}

export function ChatBotConnect() {
  const pathname = usePathname();
  const hideOnLogin = isAuthChromePath(pathname);
  const compactBottom = isCompactChromePath(pathname);

  if (hideOnLogin) return null;

  const [panelOpen, setPanelOpen] = useState(false);
  const [whatsAppDialogOpen, setWhatsAppDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [panelOpen]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group fixed z-50 flex flex-col items-end gap-3 max-[380px]:right-4 right-6",
        "lg:bottom-8",
        compactBottom
          ? "bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
          : "bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
      )}
    >
      {panelOpen && (
        <div
          className="animate-in fade-in zoom-in-95 slide-in-from-bottom-2 mb-1 w-[min(calc(100vw-2rem),17.5rem)] duration-200 fill-mode-both"
          role="menu"
          aria-label="Opciones de contacto con Lexi"
        >
          <div
            className={cn(
              "rounded-2xl border border-border/80 bg-card/95 p-3 shadow-lg shadow-black/8 ring-1 ring-black/5 backdrop-blur-xl",
              "dark:border-border dark:bg-card/90 dark:shadow-black/25"
            )}
          >
            <div className="mb-3 border-b border-border/60 pb-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Lexi
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-tight text-foreground">
                ¿Cómo quieres chatear?
              </p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                Elige tu app favorita. Respuesta en horario hábil.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                role="menuitem"
                className={cn(
                  "group/item flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-white shadow-sm ring-1 ring-black/10 transition-[filter,transform,box-shadow] duration-200",
                  "bg-linear-to-br from-[#25D366] to-[#1ebe57] hover:brightness-[1.06] active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                onClick={() => {
                  setPanelOpen(false);
                  setWhatsAppDialogOpen(true);
                }}
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/18 ring-1 ring-white/25"
                  aria-hidden
                >
                  <MessageCircle className="size-5" strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold tracking-tight">
                    Ir a WhatsApp
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium text-white/90">
                    Próximamente disponible
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-white/75 transition-transform duration-200 group-hover/item:translate-x-0.5"
                  aria-hidden
                />
              </button>

              <button
                type="button"
                role="menuitem"
                className={cn(
                  "group/item flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-white shadow-sm ring-1 ring-black/10 transition-[filter,transform,box-shadow] duration-200",
                  "bg-linear-to-br from-[#229ED9] to-[#1d8bc4] hover:brightness-[1.06] active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                onClick={() => {
                  setPanelOpen(false);
                  window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
                }}
              >
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/18 ring-1 ring-white/25"
                  aria-hidden
                >
                  <Send className="size-[1.15rem]" strokeWidth={2.35} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold tracking-tight">
                    Ir a Telegram
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium text-white/90">
                    Abre el bot en Telegram
                  </span>
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-white/75 transition-transform duration-200 group-hover/item:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative flex items-center">
        <button
          type="button"
          aria-expanded={panelOpen}
          aria-haspopup="menu"
          aria-label="Abrir opciones para contactar a Lexi"
          className="relative flex h-16 w-16 items-center justify-center
                     bg-linear-to-br from-[#39E09B] to-[#00CED1] bg-opacity-95 text-white shadow-[-8px_8px_32px_rgba(0,206,209,0.3)]
                     backdrop-blur-sm transition-transform duration-300 hover:scale-110 active:scale-95 pulse-glow"
          style={{
            borderRadius: "50% 50% 50% 10% / 50% 50% 50% 10%",
          }}
          onClick={() => setPanelOpen((o) => !o)}
        >
          <MessageCircle size={32} />
        </button>

        <div
          className="absolute -right-2 -top-10 rounded-full bg-[#0B3A1A] px-3 py-1 text-xs font-bold text-white shadow-lg transition-transform group-hover:scale-110"
        >
          Lexi
        </div>
      </div>

      <Dialog open={whatsAppDialogOpen} onOpenChange={setWhatsAppDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>WhatsApp</DialogTitle>
            <DialogDescription>Próximamente.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
