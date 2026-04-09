"use client";

import { Header } from "@/components/Header";
import { useAppStore } from "@/store/useAppStore";
import { BankCard } from "@/components/integrations/BankCard";
import { PortabilityButton } from "@/components/integrations/PortabilityButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  Bell,
  Shield,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const {
    notifications,
    setNotificationConfig,
    integrations,
    connectBank,
    disconnectBank,
    unlockAchievement,
  } = useAppStore();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      connectBank(id);
      setConnectingId(null);
      if (id === "azteca") {
        unlockAchievement("2");
      }
    }, 2000);
  };

  const aztecaIntegration = integrations.find((i) => i.id === "azteca");
  const zenfiIntegration = integrations.find((i) => i.id === "zenfi");

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-[800px] mx-auto min-h-screen relative shadow-2xl flex flex-col bg-background">
        <Header />

        <main className="p-6 flex-1 overflow-y-auto pb-28">
          <div className="mb-8 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Configuracion
              </h1>
              <p className="text-muted-foreground text-sm">
                Gestiona alertas, seguridad e integraciones financieras.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Preferencias de alertas</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Telegram</p>
                  <p className="text-xs text-muted-foreground">
                    Recibe movimientos y avisos en tu bot.
                  </p>
                </div>
                <Switch
                  checked={notifications.telegram}
                  onCheckedChange={(value) =>
                    setNotificationConfig({ telegram: value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">SMS</p>
                  <p className="text-xs text-muted-foreground">
                    Requiere numero validado previamente.
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  disabled={!notifications.phoneValidated}
                  onCheckedChange={(value) =>
                    setNotificationConfig({ sms: value })
                  }
                />
              </div>

              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => router.push("/notifications")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ir a configuracion avanzada de notificaciones
              </Button>
            </section>

            <section className="p-6 rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Estado de seguridad</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Telefono validado:{" "}
                <span className="font-medium text-foreground">
                  {notifications.phoneValidated ? "Si" : "No"}
                </span>
              </p>
            </section>

            <section className="mb-2">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                Integracion principal
              </h2>
              {aztecaIntegration && (
                <BankCard
                  name="Banco Azteca"
                  logo="BA"
                  provider="Banco Azteca"
                  connected={aztecaIntegration.connected}
                  onConnect={() => handleConnect("azteca")}
                  onDisconnect={() => disconnectBank("azteca")}
                  isConnecting={connectingId === "azteca"}
                />
              )}
            </section>

            <section className="mb-2">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Portabilidad bancaria
                </h2>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  OPEN BANKING
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <PortabilityButton
                  name="Conectar con Belvo"
                  provider="Belvo"
                  onClick={() => handleConnect("belvo")}
                />
                <PortabilityButton
                  name="Conectar con Finerio Connect"
                  provider="Finerio"
                  onClick={() => handleConnect("finerio")}
                />
              </div>
            </section>

            <section className="mb-2">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                Proximas integraciones
              </h2>
              {zenfiIntegration && (
                <BankCard
                  name="Zenfi (Buro de Credito)"
                  provider="Zenfi"
                  connected={false}
                  disabled={true}
                  onConnect={() => {}}
                />
              )}
            </section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-primary/5 border border-primary/10 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">
                  Seguridad de grado bancario
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lexi utiliza cifrado AES-256 para proteger tu informacion.
                  Nunca almacenamos tus contrasenas ni tenemos acceso directo a
                  tus fondos.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
