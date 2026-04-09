"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Phone, User } from "lucide-react";
import { api, ApiError } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import { AuthFormShell } from "@/components/auth/AuthFormShell";

export default function RegisterPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!storeHydrated) return;
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [storeHydrated, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("📢 Enviando POST a registrar usuario con:", {
        onboarding: false,
        password,
        user_name: name,
        user_phone: phone.replace(/\s+/g, ""),
      });
      const response = await api.usuario.create({
        onboarding: false,
        password,
        user_name: name,
        user_phone: phone.replace(/\s+/g, ""),
      });
      console.log("✅ Registro exitoso:", response);

      router.push("/login?registered=1");
    } catch (err: unknown) {
      console.error("❌ Error en registro:", err);

      let finalMessage = "Error al crear la cuenta";

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
          Comienza tu camino <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#a7f3d0] drop-shadow-sm">
            al éxito.
          </span>
        </>
      }
      heroSubline="Lexi Azteca te ayuda a entender y mejorar tu salud financiera mientras estudias. ¡Regístrate ahora!"
      cardTitle="Registro en Lexi Azteca"
      cardDescription="Crea tu usuario para acceder a tu Lexi-Bot."
    >
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
              placeholder="Tu Nombre (ej. Carlos Mx)"
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
            {isLoading ? "Creando..." : "Registrarse"}
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
          ¿Ya tienes cuenta?
        </span>
        <Link
          href="/login"
          className="text-sm font-bold text-foreground hover:text-primary transition-colors py-2.5 px-5 rounded-xl bg-secondary hover:bg-secondary/80 focus:outline-none"
        >
          Iniciar Sesión
        </Link>
      </div>
    </AuthFormShell>
  );
}
