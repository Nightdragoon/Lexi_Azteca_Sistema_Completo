"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Phone, User } from "lucide-react";
import { api, ApiError } from "@/services/api";
import { useSimulationStore } from "@/store/useSimulationStore";
import { useAppStore } from "@/store/useAppStore";
import { extractAccessToken } from "@/utils/extractAccessToken";
import { extractUserId } from "@/utils/extractUserId";
import { showMacToast } from "@/store/useMacToastStore";
import { AuthFormShell } from "@/components/auth/AuthFormShell";

export default function LoginPage() {
  const router = useRouter();
  const [justRegistered, setJustRegistered] = useState(false);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setAccessToken = useAppStore((s) => s.setAccessToken);
  const setUserId = useAppStore((s) => s.setUserId);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserName } = useSimulationStore();

  const [storeHydrated, setStoreHydrated] = useState(false);
  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() =>
      setStoreHydrated(true),
    );
    if (useAppStore.persist.hasHydrated()) {
      setStoreHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    setJustRegistered(q.get("registered") === "1");
  }, []);

  useEffect(() => {
    if (!storeHydrated) return;
    if (isAuthenticated) {
      router.replace(justRegistered ? "/onboarding" : "/dashboard");
    }
  }, [storeHydrated, isAuthenticated, justRegistered, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        user_name: name,
        password,
        user_phone: phone.replace(/\s+/g, ""),
      };
      console.log("📢 Enviando POST a iniciar sesión con:", payload);
      const response = await api.usuario.login(payload);
      console.log("✅ Login exitoso:", response);

      const token = extractAccessToken(response);
      if (token) {
        setAccessToken(token);
      }

      const uid = extractUserId(response);
      if (uid) {
        setUserId(uid);
      }

      setUserName(name);
      setAuthenticated(true);
      showMacToast(
        "Inicio de sesión correcto",
        `Bienvenido, ${name.trim() || "universitario"}.`
      );
      const targetRoute =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("registered") === "1"
          ? "/onboarding"
          : "/dashboard";
      router.replace(targetRoute);
    } catch (err: unknown) {
      console.error("❌ Error en login:", err);

      let finalMessage = "Error de credenciales o de conexión";

      if (err instanceof ApiError && err.status === 401) {
        finalMessage =
          "Usuario, teléfono o contraseña incorrectos. Por favor, verifica tus datos.";
      } else if (err instanceof Error && err.message) {
        finalMessage = err.message;
      }

      setError(finalMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormShell
      heroHeadline={
        <>
          Domina tus finanzas <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#a7f3d0] drop-shadow-sm">
            universitarias.
          </span>
        </>
      }
      heroSubline="Lexi Azteca te ayuda a entender y mejorar tu salud financiera mientras estudias. ¿Estás listo para el reto?"
      cardTitle="Acceso a Lexi Azteca"
      cardDescription="Ingresa tus credenciales para acceder a tu Lexi-Bot."
    >
      {justRegistered && (
        <div className="bg-primary/10 text-primary text-sm font-medium p-4 rounded-xl border border-primary/20 text-center">
          Cuenta creada. Inicia sesión con tu teléfono y contraseña.
        </div>
      )}

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm font-medium p-4 rounded-xl border border-destructive/20 text-center animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mt-10">
        <div className="space-y-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-input/40 border border-border/80 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
              placeholder="Tu Nombre (ej. Juan Pérez)"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-input/40 border border-border/80 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
              placeholder="Tu WhatsApp (ej. 525619283816)"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ShieldCheck className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-input/40 border border-border/80 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
              placeholder="Contraseña"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-2xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all overflow-hidden shadow-xl shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
          onMouseEnter={() => setIsHovered(!isLoading && true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isLoading && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          )}
          <span className="flex items-center gap-2 relative z-10">
            {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            {!isLoading && (
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1.5" : ""}`}
              />
            )}
          </span>
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground font-medium">
          ¿Aún no tienes cuenta?
        </span>
        <Link
          href="/register"
          className="text-sm font-bold text-foreground hover:text-primary transition-colors py-2.5 px-5 rounded-xl bg-secondary hover:bg-secondary/80 focus:outline-none"
        >
          Registrarme
        </Link>
      </div>
    </AuthFormShell>
  );
}
