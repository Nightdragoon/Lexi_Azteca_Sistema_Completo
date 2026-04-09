"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRightLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Landmark,
  Package,
  PiggyBank,
  ScrollText,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { useSimulationStore } from "@/store/useSimulationStore";

const MX = "es-MX";

function fmtMoney(n: number) {
  return n.toLocaleString(MX, { style: "currency", currency: "MXN" });
}

type Step = "hub" | "catalog" | "menu" | "transfer" | "pay_credit" | "receipt";

const PRODUCTS = [
  {
    id: "cuenta",
    name: "Cuenta digital / nómina",
    blurb: "Depósitos, retiros en corresponsales y app para el día a día.",
    icon: Wallet,
  },
  {
    id: "credito",
    name: "Crédito personal",
    blurb: "Liquidez para proyectos con pagos fijos programados.",
    icon: CreditCard,
  },
  {
    id: "ahorro",
    name: "Ahorro y metas",
    blurb: "Separadores de dinero y recordatorios para tus objetivos.",
    icon: PiggyBank,
  },
  {
    id: "seguros",
    name: "Protección básica",
    blurb: "Opciones de respaldo para imprevistos (información general).",
    icon: Shield,
  },
] as const;

export function BancoAztecaSimulador() {
  const userName = useSimulationStore((s) => s.userName);
  const currentBudget = useSimulationStore((s) => s.currentBudget);
  const creditBalanceDue = useSimulationStore((s) => s.creditBalanceDue);
  const bankLedger = useSimulationStore((s) => s.bankLedger);
  const lastBankReceipt = useSimulationStore((s) => s.lastBankReceipt);
  const transferOut = useSimulationStore((s) => s.transferOut);
  const payCreditBalance = useSimulationStore((s) => s.payCreditBalance);
  const clearBankReceipt = useSimulationStore((s) => s.clearBankReceipt);

  const [step, setStep] = useState<Step>("hub");
  const [narrationIdx, setNarrationIdx] = useState(0);

  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryBank, setBeneficiaryBank] = useState("");
  const [concept, setConcept] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const [payAmount, setPayAmount] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const greeting = userName?.trim() || "Cliente";

  const hubLines = useMemo(
    () => [
      `Hola, ${greeting}. Soy el asistente del portal Banco Azteca en esta práctica.`,
      "Aquí todo es simulado: no hay dinero real ni conexión con sistemas bancarios.",
      "Puedo mostrarte un catálogo breve de productos y guiarte en transferencias o pagos a crédito.",
    ],
    [greeting]
  );

  const goHub = () => {
    setStep("hub");
    setNarrationIdx(0);
    setFormError(null);
    clearBankReceipt();
    setTransferAmount("");
    setPayAmount("");
  };

  const submitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const amt = parseFloat(transferAmount.replace(/,/g, ""));
    const res = transferOut(amt, beneficiary, beneficiaryBank, concept);
    if (!res.ok) {
      setFormError(res.error ?? "No se pudo completar la operación.");
      return;
    }
    setStep("receipt");
  };

  const submitPayCredit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const amt = parseFloat(payAmount.replace(/,/g, ""));
    const res = payCreditBalance(amt);
    if (!res.ok) {
      setFormError(res.error ?? "No se pudo completar el pago.");
      return;
    }
    setStep("receipt");
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/8 via-background to-amber-400/10 p-4 sm:p-5 ring-1 ring-primary/10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Landmark className="size-5" strokeWidth={2.25} aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Simulación educativa
              </p>
              <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Banco Azteca — banca de práctica
              </h1>
              <p className="mt-1 max-w-xl text-xs text-muted-foreground sm:text-sm">
                Lexi reproduce un flujo tipo app bancaria solo para aprender. No es el
                sitio oficial ni mueve fondos reales.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-950 dark:text-amber-100">
            <Sparkles className="size-3" aria-hidden />
            Demo
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <p className="text-[11px] font-medium text-muted-foreground">Saldo disponible (simulado)</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">{fmtMoney(currentBudget)}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm">
            <p className="text-[11px] font-medium text-muted-foreground">Saldo crédito personal (simulado)</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">{fmtMoney(creditBalanceDue)}</p>
          </div>
        </div>
      </div>

      {step === "hub" && (
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Building2 className="size-4 text-primary" aria-hidden />
              Bienvenida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{hubLines[narrationIdx]}</p>
            <div className="flex flex-wrap gap-2">
              {narrationIdx > 0 ? (
                <Button type="button" variant="outline" size="sm" onClick={() => setNarrationIdx((i) => i - 1)}>
                  Anterior
                </Button>
              ) : null}
              {narrationIdx < hubLines.length - 1 ? (
                <Button type="button" size="sm" onClick={() => setNarrationIdx((i) => i + 1)}>
                  Siguiente
                </Button>
              ) : (
                <>
                  <Button type="button" size="sm" onClick={() => setStep("catalog")}>
                    Ver catálogo
                  </Button>
                  <Button type="button" variant="secondary" size="sm" onClick={() => setStep("menu")}>
                    Ir a operaciones
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "catalog" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-foreground">Catálogo de productos</h2>
            <Button type="button" variant="ghost" size="sm" className="gap-1" onClick={goHub}>
              <ArrowLeft className="size-4" />
              Inicio
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Resumen ilustrativo. En una app real revisarías tasas, comisiones y contratos.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <Card key={p.id} className="border-border/80 transition-shadow hover:shadow-md">
                <CardContent className="flex gap-3 p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <p.icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{p.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.blurb}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            type="button"
            className="w-full gap-2 sm:w-auto"
            onClick={() => setStep("menu")}
          >
            Continuar: elegir una operación
            <ArrowRightLeft className="size-4" aria-hidden />
          </Button>
        </div>
      )}

      {step === "menu" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-foreground">¿Qué quieres practicar?</h2>
            <Button type="button" variant="ghost" size="sm" className="gap-1" onClick={() => setStep("catalog")}>
              <Package className="size-4" />
              Catálogo
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setStep("transfer");
                setFormError(null);
              }}
              className={cn(
                "flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all",
                "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <ArrowRightLeft className="size-6 text-primary" />
              <span className="font-semibold text-foreground">Transferir a otra persona</span>
              <span className="text-xs text-muted-foreground">
                Simula una salida de dinero con banco y concepto (como SPEI al estilo app).
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("pay_credit");
                setFormError(null);
              }}
              className={cn(
                "flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all",
                "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <CreditCard className="size-6 text-primary" />
              <span className="font-semibold text-foreground">Pagar mi crédito</span>
              <span className="text-xs text-muted-foreground">
                Abona al saldo simulado del crédito personal; tu saldo de cuenta bajará igual.
              </span>
            </button>
          </div>
        </div>
      )}

      {step === "transfer" && (
        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Transferencia</CardTitle>
            <Button type="button" variant="ghost" size="sm" onClick={() => setStep("menu")}>
              Volver
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Completa los datos como en un formulario real. Usa cifras con o sin decimales.
            </p>
            <form className="space-y-3" onSubmit={submitTransfer}>
              <div className="space-y-1.5">
                <label htmlFor="sim-t-amount" className="text-xs font-medium text-foreground">
                  Monto (MXN)
                </label>
                <Input
                  id="sim-t-amount"
                  inputMode="decimal"
                  placeholder="Ej. 350.50"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="sim-t-name" className="text-xs font-medium text-foreground">
                  Beneficiario
                </label>
                <Input
                  id="sim-t-name"
                  placeholder="Nombre o alias"
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="sim-t-bank" className="text-xs font-medium text-foreground">
                  Banco destino
                </label>
                <Input
                  id="sim-t-bank"
                  placeholder="Ej. Banco del Bienestar"
                  value={beneficiaryBank}
                  onChange={(e) => setBeneficiaryBank(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="sim-t-concept" className="text-xs font-medium text-foreground">
                  Concepto (opcional)
                </label>
                <Input
                  id="sim-t-concept"
                  placeholder="Ej. Renta abril"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                />
              </div>
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
              <Button type="submit" className="w-full sm:w-auto">
                Enviar transferencia simulada
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "pay_credit" && (
        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Pago a crédito</CardTitle>
            <Button type="button" variant="ghost" size="sm" onClick={() => setStep("menu")}>
              Volver
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Saldo pendiente: <span className="font-semibold text-foreground">{fmtMoney(creditBalanceDue)}</span>.
              No puedes pagar más que eso ni más que tu saldo disponible.
            </p>
            <form className="space-y-3" onSubmit={submitPayCredit}>
              <div className="space-y-1.5">
                <label htmlFor="sim-p-amount" className="text-xs font-medium text-foreground">
                  Monto a pagar (MXN)
                </label>
                <Input
                  id="sim-p-amount"
                  inputMode="decimal"
                  placeholder="Ej. 800"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  required
                />
              </div>
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
              <Button type="submit" className="w-full sm:w-auto">
                Registrar pago simulado
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "receipt" && lastBankReceipt && (
        <Card className="border-primary/25 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-primary">
              <CheckCircle2 className="size-5" aria-hidden />
              Comprobante simulado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-semibold text-foreground">{lastBankReceipt.title}</p>
            <p className="tabular-nums text-lg font-bold text-foreground">{fmtMoney(lastBankReceipt.amount)}</p>
            <p className="text-muted-foreground">{lastBankReceipt.detail}</p>
            <p className="text-xs text-muted-foreground">
              Folio: {lastBankReceipt.id} · {lastBankReceipt.timestamp.toLocaleString(MX)}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="button" onClick={() => { clearBankReceipt(); setStep("menu"); }}>
                Otra operación
              </Button>
              <Button type="button" variant="outline" onClick={goHub}>
                Volver al inicio del simulador
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {bankLedger.length > 0 && step !== "receipt" ? (
        <Card className="border-dashed border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <ScrollText className="size-4" aria-hidden />
              Movimientos recientes (simulado)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {bankLedger.slice(0, 6).map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/50 py-2 last:border-0"
                >
                  <span className="min-w-0 flex-1 text-foreground">
                    {e.title}
                    <span className="mt-0.5 block truncate text-[11px] font-normal text-muted-foreground">
                      {e.detail}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums font-medium text-destructive">
                    −{fmtMoney(e.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
