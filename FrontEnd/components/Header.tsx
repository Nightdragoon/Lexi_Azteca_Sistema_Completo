"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  LogOut,
  Sparkles,
  Bell,
  Menu,
  Settings,
} from "lucide-react";
import appIcon from "@/app/icon.png";
import { useSimulationStore } from "@/store/useSimulationStore";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const router = useRouter();
  const logout = useAppStore((s) => s.logout);
  const setUserName = useSimulationStore((s) => s.setUserName);
  const { level = 5, xp = 1250, userName } = useSimulationStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [storeHydrated, setStoreHydrated] = useState(() =>
    useSimulationStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsub = useSimulationStore.persist.onFinishHydration(() =>
      setStoreHydrated(true),
    );
    return unsub;
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    setUserName(null);
    router.replace("/login");
  };

  const handleMenuNavigation = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
    <header className="relative z-80 isolate bg-gradient-to-br from-[#00CF0C] to-[#007400] text-white pt-10 pb-10 px-6 md:px-12 overflow-visible shadow-[0_10px_30px_-10px_rgba(0,116,0,0.6)]">
      {/* Capa de sombra radial para dar profundidad al gradiente */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>

      <motion.div
        className="absolute -top-24 -right-24 w-80 h-80 opacity-50 mix-blend-overlay rotate-[15deg] pointer-events-none"
        initial={{ opacity: 0, scale: 0.75, rotate: -18, x: 40, y: -30 }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          y: [0, -6, 0],
          rotate: [8, 15, 8],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(200%2C200)' fill='none' stroke='%23ffffff'%3E%3Ccircle r='180' stroke-width='1.8' opacity='0.3'/%3E%3Cg opacity='0.5'%3E%3Cline x1='0' y1='-180' x2='0' y2='-166' stroke-width='3.5'/%3E%3Cline x1='0' y1='180' x2='0' y2='166' stroke-width='3.5'/%3E%3Cline x1='-180' y1='0' x2='-166' y2='0' stroke-width='3.5'/%3E%3Cline x1='180' y1='0' x2='166' y2='0' stroke-width='3.5'/%3E%3Cg transform='rotate(45)'%3E%3Cline x1='0' y1='-180' x2='0' y2='-169' stroke-width='2.5'/%3E%3Cline x1='0' y1='180' x2='0' y2='169' stroke-width='2.5'/%3E%3Cline x1='-180' y1='0' x2='-169' y2='0' stroke-width='2.5'/%3E%3Cline x1='180' y1='0' x2='169' y2='0' stroke-width='2.5'/%3E%3C/g%3E%3Cg transform='rotate(22.5)'%3E%3Cline x1='0' y1='-180' x2='0' y2='-173' stroke-width='1.5'/%3E%3Cline x1='0' y1='180' x2='0' y2='173' stroke-width='1.5'/%3E%3Cline x1='-180' y1='0' x2='-173' y2='0' stroke-width='1.5'/%3E%3Cline x1='180' y1='0' x2='173' y2='0' stroke-width='1.5'/%3E%3C/g%3E%3Cg transform='rotate(67.5)'%3E%3Cline x1='0' y1='-180' x2='0' y2='-173' stroke-width='1.5'/%3E%3Cline x1='0' y1='180' x2='0' y2='173' stroke-width='1.5'/%3E%3Cline x1='-180' y1='0' x2='-173' y2='0' stroke-width='1.5'/%3E%3Cline x1='180' y1='0' x2='173' y2='0' stroke-width='1.5'/%3E%3C/g%3E%3C/g%3E%3Cpolygon points='0%2C-192 -8%2C-174 8%2C-174' fill='%23ffffff' opacity='0.8'/%3E%3Cpolygon points='0%2C192 8%2C174 -8%2C174' fill='%23ffffff' opacity='0.8'/%3E%3Cpolygon points='-192%2C0 -174%2C-8 -174%2C8' fill='%23ffffff' opacity='0.8'/%3E%3Cpolygon points='192%2C0 174%2C8 174%2C-8' fill='%23ffffff' opacity='0.8'/%3E%3Cg opacity='0.55'%3E%3Cpolygon points='127%2C-127 115%2C-108 108%2C-115' fill='%23ffffff'/%3E%3Cpolygon points='-127%2C-127 -108%2C-115 -115%2C-108' fill='%23ffffff'/%3E%3Cpolygon points='127%2C127 108%2C115 115%2C108' fill='%23ffffff'/%3E%3Cpolygon points='-127%2C127 -115%2C108 -108%2C115' fill='%23ffffff'/%3E%3C/g%3E%3Ccircle r='162' stroke-width='3' stroke-dasharray='5 3.5' opacity='0.55'/%3E%3Ccircle r='148' stroke-width='1.8' opacity='0.35'/%3E%3Ccircle r='120' stroke-width='2' opacity='0.45'/%3E%3Ccircle r='110' stroke-width='2.5' stroke-dasharray='6 2.5' opacity='0.45'/%3E%3Cg opacity='0.6'%3E%3Crect x='-16' y='-138' width='32' height='32' rx='3' stroke-width='2'/%3E%3Cg transform='rotate(90)'%3E%3Crect x='-16' y='-138' width='32' height='32' rx='3' stroke-width='2'/%3E%3C/g%3E%3Cg transform='rotate(180)'%3E%3Crect x='-16' y='-138' width='32' height='32' rx='3' stroke-width='2'/%3E%3C/g%3E%3Cg transform='rotate(270)'%3E%3Crect x='-16' y='-138' width='32' height='32' rx='3' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3Cg opacity='0.4'%3E%3Cg transform='rotate(45)'%3E%3Crect x='-12' y='-138' width='24' height='24' rx='3' stroke-width='1.5'/%3E%3C/g%3E%3Cg transform='rotate(135)'%3E%3Crect x='-12' y='-138' width='24' height='24' rx='3' stroke-width='1.5'/%3E%3C/g%3E%3Cg transform='rotate(225)'%3E%3Crect x='-12' y='-138' width='24' height='24' rx='3' stroke-width='1.5'/%3E%3C/g%3E%3Cg transform='rotate(315)'%3E%3Crect x='-12' y='-138' width='24' height='24' rx='3' stroke-width='1.5'/%3E%3C/g%3E%3C/g%3E%3Crect x='-58' y='-58' width='48' height='48' rx='4' stroke-width='1.8' opacity='0.55'/%3E%3Crect x='10' y='-58' width='48' height='48' rx='4' stroke-width='1.8' opacity='0.55'/%3E%3Crect x='-58' y='10' width='48' height='48' rx='4' stroke-width='1.8' opacity='0.55'/%3E%3Crect x='10' y='10' width='48' height='48' rx='4' stroke-width='1.8' opacity='0.55'/%3E%3Cg opacity='0.35' stroke-width='1.2'%3E%3Cline x1='-58' y1='-58' x2='-10' y2='-10'/%3E%3Cline x1='-10' y1='-58' x2='-58' y2='-10'/%3E%3Cline x1='10' y1='-58' x2='58' y2='-10'/%3E%3Cline x1='58' y1='-58' x2='10' y2='-10'/%3E%3Cline x1='-58' y1='10' x2='-10' y2='58'/%3E%3Cline x1='-10' y1='10' x2='-58' y2='58'/%3E%3Cline x1='10' y1='10' x2='58' y2='58'/%3E%3Cline x1='58' y1='10' x2='10' y2='58'/%3E%3C/g%3E%3Ccircle r='38' stroke-width='2.2' opacity='0.65'/%3E%3Ccircle r='6' fill='%23ffffff' opacity='0.8' cx='-11' cy='-8'/%3E%3Ccircle r='6' fill='%23ffffff' opacity='0.8' cx='11' cy='-8'/%3E%3Cpath d='M -15 10 Q 0 24 15 10' stroke-width='2.2' opacity='0.75' fill='none'/%3E%3Ccircle r='3' fill='%23ffffff' opacity='0.95'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "drop-shadow(0 0 1px rgba(255,255,255,0.9))",
        }}
      />

      <div className="relative z-10 flex flex-col gap-10">
        {/* Navegación con efecto Glassmorphism y sombras */}
        <div className="flex justify-between items-center drop-shadow-md">
          <div className="flex items-center gap-3 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-inner">
            <Image
              src={appIcon}
              alt="Banco Azteca Logo"
              width={28}
              height={28}
              className="rounded-full"
              priority
            />
            <span className="font-semibold text-white/95 text-sm tracking-widest drop-shadow-sm">
              LEXI AZTECA
            </span>
          </div>

          <div className="relative z-120" ref={menuRef}>
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center justify-center bg-black/15 p-2.5 rounded-full border border-white/10 text-white/85 backdrop-blur-md shadow-lg transition hover:text-white hover:bg-black/20"
            >
              <Menu size={20} className="drop-shadow-sm" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/15 bg-black/55 backdrop-blur-lg shadow-2xl p-2 z-130">
                <button
                  type="button"
                  onClick={() => handleMenuNavigation("/notifications")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <Bell size={17} />
                  Notificaciones
                </button>
                <button
                  type="button"
                  onClick={() => handleMenuNavigation("/help")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <HelpCircle size={17} />
                  Ayuda
                </button>
                <button
                  type="button"
                  onClick={() => handleMenuNavigation("/settings")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <Settings size={17} />
                  Configuración
                </button>
                <div className="my-1 h-px bg-white/10" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut size={17} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Textos y Estatus con sombras para resaltar sobre colores claros */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white drop-shadow-lg">
            Hola,{" "}
            <span className="font-bold">
              {storeHydrated ? userName || "Universitario" : ""}
            </span>
            .
          </h2>

          <div className="inline-flex items-center gap-3 bg-black/25 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] self-start md:self-auto">
            <Sparkles
              className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              size={22}
              strokeWidth={2.5}
            />
            <div className="flex items-center gap-2 drop-shadow-md">
              <span className="text-amber-50 text-sm font-semibold tracking-wider">
                NIVEL {level}
              </span>
              <span className="w-1.5 h-1.5 bg-amber-400/60 rounded-full"></span>
              <span className="text-white font-extrabold tracking-tight">
                {xp.toLocaleString("es-MX")}{" "}
                <span className="text-white/70 font-medium text-xs">XP</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
