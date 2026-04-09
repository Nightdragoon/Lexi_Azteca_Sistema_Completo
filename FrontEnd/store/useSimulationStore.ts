import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  options: { label: string; impact: number; textResponse: string }[];
}

export type BankLedgerEntry = {
  id: string;
  type: 'transfer_out' | 'credit_payment';
  amount: number;
  title: string;
  detail: string;
  timestamp: Date;
};

export interface SimulationState {
  userName: string | null;
  healthScore: number; // 0-100
  xp: number; // Total XP
  level: number;
  currentBudget: number;
  spendingLimit: number;
  debtRatio: number;
  antExpensesStatus: 'Secure' | 'Warning' | 'Breached';
  activeMissions: Mission[];
  history: { action: string; timestamp: Date; xpGained: number }[];
  /** Simulador bancario: saldo pendiente de un crédito de ejemplo */
  creditBalanceDue: number;
  bankLedger: BankLedgerEntry[];
  lastBankReceipt: BankLedgerEntry | null;
  completeMission: (missionId: string, optionIndex: number) => void;
  setUserName: (name: string | null) => void;
  transferOut: (
    amount: number,
    beneficiary: string,
    beneficiaryBank: string,
    concept: string
  ) => { ok: boolean; error?: string };
  payCreditBalance: (amount: number) => { ok: boolean; error?: string };
  clearBankReceipt: () => void;
  syncHealthScore: () => Promise<void>;
}

const MAX_LEDGER = 40;
const INITIAL_HEALTH_SCORE = 0;

function makeTransferId() {
  return `tr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

type WalletDataResponse = {
  financial_health?: string | number;
  financial_health_score?: string | number;
};

const parseHealthScore = (payload: WalletDataResponse): number | null => {
  const raw = payload.financial_health ?? payload.financial_health_score;
  const score = Number(raw);
  if (!Number.isFinite(score)) return null;
  return Math.min(100, Math.max(0, score));
};

export const useSimulationStore = create<SimulationState>()(
  persist(
    (set) => ({
      userName: null,
      // healthScore: INITIAL_HEALTH_SCORE,
      healthScore: 78,
      xp: 350,
      level: 3,
      currentBudget: 4500,
      spendingLimit: 2000,
      debtRatio: 15,
      antExpensesStatus: 'Warning',
      activeMissions: [
        {
          id: 'm1',
          title: 'Concierto Imprevisto',
          description:
            'Tus amigos van al concierto de moda. Cuesta $1,500. ¿Qué haces?',
          xpReward: 50,
          options: [
            {
              label: 'Tarjetazo (Crédito)',
              impact: -15,
              textResponse: 'Usaste crédito. Tu ratio de deuda subió.',
            },
            {
              label: 'Usar Ahorros',
              impact: -5,
              textResponse:
                'Usaste tus ahorros. Tu salud baja ligeramente, pero no hay deuda.',
            },
            {
              label: 'No ir',
              impact: +10,
              textResponse: 'Ahorraste. +10 de Salud Financiera.',
            },
          ],
        },
      ],
      history: [
        {
          action: 'Ahorro semanal',
          timestamp: new Date(Date.now() - 86400000),
          xpGained: 20,
        },
        {
          action: 'Evitó gasto hormiga',
          timestamp: new Date(Date.now() - 86400000 * 2),
          xpGained: 15,
        },
      ],
      creditBalanceDue: 4200,
      bankLedger: [],
      lastBankReceipt: null,
      transferOut: (amount, beneficiary, beneficiaryBank, concept) => {
        const n = Number(amount);
        if (!Number.isFinite(n) || n <= 0) {
          return { ok: false, error: 'Ingresa un monto válido mayor a cero.' };
        }
        let result: { ok: boolean; error?: string } = { ok: false };
        set((state) => {
          if (n > state.currentBudget) {
            result = {
              ok: false,
              error: 'Fondos insuficientes en tu cuenta simulada.',
            };
            return state;
          }
          const entry: BankLedgerEntry = {
            id: makeTransferId(),
            type: 'transfer_out',
            amount: n,
            title: 'Transferencia enviada',
            detail: `A: ${beneficiary.trim() || '—'} · ${
              beneficiaryBank.trim() || 'Banco'
            } · ${concept.trim() || 'Sin concepto'}`,
            timestamp: new Date(),
          };
          result = { ok: true };
          return {
            currentBudget: Math.round((state.currentBudget - n) * 100) / 100,
            bankLedger: [entry, ...state.bankLedger].slice(0, MAX_LEDGER),
            lastBankReceipt: entry,
          };
        });
        return result;
      },
      payCreditBalance: (amount) => {
        const n = Number(amount);
        if (!Number.isFinite(n) || n <= 0) {
          return { ok: false, error: 'Ingresa un monto válido mayor a cero.' };
        }
        let result: { ok: boolean; error?: string } = { ok: false };
        set((state) => {
          if (state.creditBalanceDue <= 0) {
            result = {
              ok: false,
              error: 'No tienes saldo pendiente en este crédito simulado.',
            };
            return state;
          }
          if (n > state.creditBalanceDue) {
            result = {
              ok: false,
              error: 'El monto supera el saldo pendiente del crédito.',
            };
            return state;
          }
          if (n > state.currentBudget) {
            result = {
              ok: false,
              error: 'Fondos insuficientes en tu cuenta simulada.',
            };
            return state;
          }
          const entry: BankLedgerEntry = {
            id: makeTransferId(),
            type: 'credit_payment',
            amount: n,
            title: 'Pago a crédito',
            detail: 'Crédito personal simulado · aplicación a capital',
            timestamp: new Date(),
          };
          result = { ok: true };
          const newDue = Math.round((state.creditBalanceDue - n) * 100) / 100;
          return {
            currentBudget: Math.round((state.currentBudget - n) * 100) / 100,
            creditBalanceDue: newDue,
            bankLedger: [entry, ...state.bankLedger].slice(0, MAX_LEDGER),
            lastBankReceipt: entry,
          };
        });
        return result;
      },
      clearBankReceipt: () => set({ lastBankReceipt: null }),
      syncHealthScore: async () => {
        const userId = useAppStore.getState().userId;
        if (!userId) return;
        try {
          const walletData = await api.wallet.data(userId);
          if (!walletData || typeof walletData !== 'object') return;
          const score = parseHealthScore(walletData as WalletDataResponse);
          if (score === null) return;
          set({ healthScore: score });
        } catch (error) {
          console.error('[simulation-store] No se pudo sincronizar healthScore', error);
        }
      },
      completeMission: (missionId, optionIndex) =>
        set((state) => {
          const mission = state.activeMissions.find((m) => m.id === missionId);
          if (!mission) return state;

          const option = mission.options[optionIndex];

          return {
            activeMissions: state.activeMissions.filter(
              (m) => m.id !== missionId
            ),
            healthScore: Math.min(
              100,
              Math.max(0, state.healthScore + option.impact)
            ),
            xp: state.xp + mission.xpReward,
            history: [
              {
                action: `Completó: ${mission.title}`,
                timestamp: new Date(),
                xpGained: mission.xpReward,
              },
              ...state.history,
            ],
          };
        }),
      setUserName: (name) => {
        set({ userName: name });
        if (name) {
          void useSimulationStore.getState().syncHealthScore();
        }
      },
    }),
    {
      name: 'lexi-simulation-storage',
      partialize: (state) => ({ userName: state.userName }),
    }
  )
);
