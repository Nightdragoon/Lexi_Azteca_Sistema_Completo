"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Loader2,
  RefreshCw,
  ShieldAlert,
  Target,
  Zap,
} from "lucide-react";
import { AntExpensesShield } from "@/components/AntExpensesShield";
import { MissionApiCard } from "@/components/misiones/MissionApiCard";
import { api, ApiError } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { showMacToast } from "@/store/useMacToastStore";
import type { ApiMission } from "@/types/api-missions";
import {
  missionXp,
  parseMissionList,
} from "@/utils/missions";
import { cn } from "@/utils/cn";

export default function MisionesPage() {
  const userId = useAppStore((s) => s.userId);
  const xp = useAppStore((s) => s.xp);
  const addXP = useAppStore((s) => s.addXP);

  const [catalog, setCatalog] = useState<ApiMission[]>([]);
  const [activeList, setActiveList] = useState<ApiMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const loadMissions = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const rawCatalog = await api.misiones.getAll();
      setCatalog(parseMissionList(rawCatalog));

      if (userId) {
        const rawActive = await api.misiones.active(userId);
        setActiveList(parseMissionList(rawActive));
      } else {
        setActiveList([]);
      }
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : "No se pudieron cargar las misiones.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void loadMissions();
  }, [loadMissions]);

  const activeIds = useMemo(
    () => new Set(activeList.map((m) => m.mission_id)),
    [activeList]
  );

  const disponibles = useMemo(() => {
    return catalog.filter((m) => {
      if (activeIds.has(m.mission_id)) return false;
      const st = m.status.toLowerCase();
      return st.includes("dispon") || st === "" || st === "abierta";
    });
  }, [catalog, activeIds]);

  const handleAccept = async (m: ApiMission) => {
    console.log("[handleAccept] userId:", userId, "| mission_id:", m.mission_id, "| payload:", { user_id: userId, mision_id: m.mission_id });
    if (!userId) {
      showMacToast(
        "Sesión incompleta",
        "No encontramos tu user_id. Vuelve a iniciar sesión."
      );
      return;
    }
    setPending(m.mission_id);
    try {
      await api.misiones.accept({ user_id: userId, mision_id: m.mission_id });
      showMacToast("Misión aceptada", m.mission_name);
      await loadMissions();
    } catch (e) {
      const msg =
        e instanceof ApiError ? e.message : "No se pudo aceptar la misión.";
      showMacToast("Error", msg);
    } finally {
      setPending(null);
    }
  };

  const handleComplete = async (m: ApiMission) => {
    if (!userId) {
      showMacToast(
        "Sesión incompleta",
        "No encontramos tu user_id. Vuelve a iniciar sesión."
      );
      return;
    }
    setPending(m.mission_id);
    try {
      await api.misiones.complete({ user_id: userId, mision_id: m.mission_id });
      const gained = missionXp(m);
      if (gained > 0) {
        addXP(gained);
      }
      showMacToast("Misión completada", `+${gained} XP · ${m.mission_name}`);
      await loadMissions();
    } catch (e) {
      const msg =
        e instanceof ApiError ? e.message : "No se pudo completar la misión.";
      showMacToast("Error", msg);
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-foreground selection:bg-primary/30">
      <div className="relative mx-auto flex min-h-screen max-w-[800px] flex-col overflow-hidden bg-background shadow-2xl">
        <header className="relative z-20 flex flex-col gap-4 overflow-hidden bg-linear-to-r from-[#020617] to-[#0f172a] px-6 pb-6 pt-12 text-white">
          <Link
            href="/dashboard"
            className="mb-2 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={20} />
            Volver al Dashboard
          </Link>

          <div className="relative z-10 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Centro de Misiones
              </h1>
              <p className="mt-1 text-sm text-white/70">
               Supervivencia financiera activa
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {/* <Button
                type="button"
                variant="secondary"
                size="sm"
                className="gap-1.5 border border-white/10 bg-white/10 text-white hover:bg-white/20"
                disabled={loading}
                onClick={() => void loadMissions()}
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <RefreshCw className="size-4" aria-hidden />
                )}
                Actualizar
              </Button> */}
              <div className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/20 px-3 py-1.5 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Zap size={16} className="fill-accent text-accent" />
                <span className="font-bold text-accent">{xp} XP</span>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 flex h-full flex-col gap-8 overflow-y-auto px-5 py-6 pb-28 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* {!userId ? (
            <div
              className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-50"
              role="status"
            >
              <ShieldAlert className="size-5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">Falta el ID de usuario en sesión</p>
                <p className="mt-1 text-amber-900/90 dark:text-amber-100/90">
                  Cierra sesión y vuelve a entrar para que el backend envíe{" "}
                  <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
                    user_id
                  </code>{" "}
                  en el login. Mientras tanto solo verás el catálogo general.
                </p>
              </div>
            </div>
          ) : null} */}

          {error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <p className="font-medium">{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => void loadMissions()}
              >
                Reintentar
              </Button>
            </div>
          ) : null}

          <section className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-500">
            <AntExpensesShield />
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-200 duration-500">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target size={24} className="text-primary" />
                <h2 className="text-xl font-bold tracking-tight">
                  En progreso
                </h2>
              </div>
              
            </div>

            {loading && activeList.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
                <Loader2 className="size-6 animate-spin" aria-hidden />
                Cargando activas…
              </div>
            ) : activeList.length > 0 ? (
              <div className="flex flex-col gap-4">
                {activeList.map((m) => (
                  <MissionApiCard
                    key={`active-${m.mission_id}`}
                    mission={m}
                    mode="active"
                    busy={pending === m.mission_id}
                    primaryLabel="Completar misión"
                    onPrimary={() => void handleComplete(m)}
                  />
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-xl border border-dashed border-border px-6 py-12 text-center",
                  !userId && "opacity-80"
                )}
              >
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Target className="size-8 text-primary opacity-60" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Sin misiones activas
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Acepta una del catálogo o completa acciones en el simulador si la
                  misión lo pide.
                </p>
                <Button asChild variant="outline" className="mt-6" size="sm">
                  <Link href="/simulador" className="gap-2">
                    Ir al simulador
                    <BookOpen className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            )}
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-300 duration-500 mb-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Catálogo disponible
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Acepta una para moverla a “En progreso”.
                </p>
              </div>
            </div>

            {loading && catalog.length === 0 && !error ? (
              <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
                <Loader2 className="size-6 animate-spin" aria-hidden />
                Cargando catálogo…
              </div>
            ) : disponibles.length > 0 ? (
              <div className="flex flex-col gap-4">
                {disponibles.map((m) => (
                  <MissionApiCard
                    key={`cat-${m.mission_id}`}
                    mission={m}
                    mode="catalog"
                    busy={pending === m.mission_id}
                    primaryLabel="Aceptar misión"
                    onPrimary={() => void handleAccept(m)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/20 px-6 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No hay misiones disponibles nuevas, o ya están todas en progreso.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
