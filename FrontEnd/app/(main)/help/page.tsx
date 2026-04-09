"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageCircleQuestion, Bell, Plug } from "lucide-react";
import { useRouter } from "next/navigation";

const FAQ_ITEMS = [
  {
    question: "Como activo notificaciones?",
    answer:
      "Ve a Notificaciones para vincular Telegram o validar tu numero y activar SMS.",
  },
  {
    question: "Como conecto mi banco?",
    answer:
      "En Integraciones puedes conectar Banco Azteca u otros proveedores compatibles.",
  },
  {
    question: "Como subo de nivel?",
    answer:
      "Completa misiones y actividades para ganar XP dentro del simulador y retos.",
  },
];

export default function HelpPage() {
  const router = useRouter();

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
                Centro de ayuda
              </h1>
              <p className="text-muted-foreground text-sm">
                Respuestas rapidas para usar Lexi.
              </p>
            </div>
          </div>

          <section className="space-y-4 mb-6">
            {FAQ_ITEMS.map((item) => (
              <article
                key={item.question}
                className="p-5 rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircleQuestion className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-sm">{item.question}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => router.push("/notifications")}
            >
              <Bell className="w-4 h-4 mr-2" />
              Ir a notificaciones
            </Button>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => router.push("/integrations")}
            >
              <Plug className="w-4 h-4 mr-2" />
              Ir a integraciones
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
