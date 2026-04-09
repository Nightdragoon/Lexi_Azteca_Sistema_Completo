import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingData {
  currentStep: number;
  privacyAccepted: boolean;
  goals: string[];
  riskAppetite: 'Bajo' | 'Moderado' | 'Alto';
  monthlyIncome: string;
  learningRoute: 'basico' | 'intermedio' | 'inversion' | 'ahorro' | 'deuda' | '';
  learningLevel: 'basico' | 'intermedio' | 'intermedio-avanzado' | '';
  learningAnswers: Record<string, string>;
  hasCompletedOnboarding: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  type: 'badge' | 'reward';
}

export interface BankIntegration {
  id: string;
  name: string;
  connected: boolean;
  lastSync?: string;
  provider: 'Banco Azteca' | 'Belvo' | 'Finerio' | 'Zenfi';
}

export interface AppState {
  /** Sesión local: solo usuarios que completaron login pueden ver rutas protegidas. */
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  /** JWT u otro bearer devuelto por `POST /usuario/login` (ver `docs/backend-contract.md`). */
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  /** `user_id` del backend para rutas como `/misiones/activas/{user_id}`. */
  userId: string | null;
  setUserId: (id: string | null) => void;
  logout: () => void;

  // Onboarding
  onboarding: OnboardingData;
  setOnboarding: (data: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;
  
  // Gamification
  xp: number;
  level: number;
  rank: 'Bronce' | 'Plata' | 'Oro';
  achievements: Achievement[];
  addXP: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  
  // Integrations
  integrations: BankIntegration[];
  connectBank: (id: string) => void;
  disconnectBank: (id: string) => void;
  
  // Notifications
  notifications: {
    telegram: boolean;
    sms: boolean;
    phoneValidated: boolean;
    telegramLinked: boolean;
  };
  setNotificationConfig: (config: Partial<AppState['notifications']>) => void;
}

const initialOnboarding: OnboardingData = {
  currentStep: 0,
  privacyAccepted: false,
  goals: [],
  riskAppetite: 'Moderado',
  monthlyIncome: '',
  learningRoute: '',
  learningLevel: '',
  learningAnswers: {},
  hasCompletedOnboarding: false,
};

const initialAchievements: Achievement[] = [
  { id: '1', title: 'Ahorrador Novato', description: 'Primer paso hacia tu libertad financiera.', unlocked: true, icon: '🌱', type: 'badge' },
  { id: '2', title: 'Explorador del Tesoro', description: 'Conectaste tu primera cuenta bancaria.', unlocked: false, icon: '🏦', type: 'badge' },
  { id: '3', title: 'Mago del Presupuesto', description: 'Mantuviste tus gastos bajo control por una semana.', unlocked: false, icon: '🧙‍♂️', type: 'badge' },
  { id: '4', title: 'Maestro de la Inversión', description: 'Completaste el curso de inversión básica.', unlocked: false, icon: '📈', type: 'reward' },
];

const initialIntegrations: BankIntegration[] = [
  { id: 'azteca', name: 'Banco Azteca', connected: false, provider: 'Banco Azteca' },
  { id: 'belvo', name: 'Belvo (Open Banking)', connected: false, provider: 'Belvo' },
  { id: 'finerio', name: 'Finerio Connect', connected: false, provider: 'Finerio' },
  { id: 'zenfi', name: 'Zenfi (Buró de Crédito)', connected: false, provider: 'Zenfi' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      userId: null,
      setUserId: (id) => set({ userId: id }),
      logout: () =>
        set({ isAuthenticated: false, accessToken: null, userId: null }),

      // Onboarding
      onboarding: initialOnboarding,
      setOnboarding: (data) => set((state) => ({ 
        onboarding: { ...state.onboarding, ...data } 
      })),
      resetOnboarding: () => set({ onboarding: initialOnboarding }),

      // Gamification
      xp: 120,
      level: 1,
      rank: 'Bronce',
      achievements: initialAchievements,
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        let newRank = state.rank;
        if (newLevel >= 10) newRank = 'Oro';
        else if (newLevel >= 5) newRank = 'Plata';
        
        return { xp: newXP, level: newLevel, rank: newRank };
      }),
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map((a) => 
          a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
        ),
      })),

      // Integrations
      integrations: initialIntegrations,
      connectBank: (id) => set((state) => ({
        integrations: state.integrations.map((i) => 
          i.id === id ? { ...i, connected: true, lastSync: new Date().toISOString() } : i
        ),
      })),
      disconnectBank: (id) => set((state) => ({
        integrations: state.integrations.map((i) => 
          i.id === id ? { ...i, connected: false } : i
        ),
      })),

      // Notifications
      notifications: {
        telegram: false,
        sms: false,
        phoneValidated: false,
        telegramLinked: false,
      },
      setNotificationConfig: (config) => set((state) => ({
        notifications: { ...state.notifications, ...config }
      })),
    }),
    {
      name: 'lexi-app-storage',
      merge: (persistedState, currentState) => {
        const p = persistedState as Partial<AppState> | undefined;
        if (!p) return currentState;
        const mergedOnboarding = {
          ...currentState.onboarding,
          ...(p.onboarding ?? {}),
        };
        return {
          ...currentState,
          ...p,
          onboarding: mergedOnboarding,
          isAuthenticated: p.isAuthenticated ?? false,
          accessToken: p.accessToken ?? null,
          userId: p.userId ?? null,
        };
      },
    }
  )
);
