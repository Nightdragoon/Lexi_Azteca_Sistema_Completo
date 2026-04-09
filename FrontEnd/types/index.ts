export interface User {
  user_id: number;
  user_phone: string;
  user_name: string;
  password?: string;
  onboarding: boolean;
  created_at: string;
}

export interface WalletState {
  userId: string;
  virtualBalance: number;
  monthlyVirtualIncome: number;
  financialHealthScore: number;
  xpPoints: number;
  currentLevel: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: 'Ahorro' | 'Gasto Hormiga' | 'Inversión' | 'Emergencia' | 'Ingreso' | 'Deuda';
  description: string;
  timestamp: string;
}

export interface MissionOption {
  label: string;
  impact: number;
  textResponse: string;
}

export interface Mission {
  id: string;
  userId: string;
  missionType: string;
  status: 'Pending' | 'Resolved' | 'Ignored';
  resolution?: string;
  title: string;
  description: string;
  options: MissionOption[];
  xpReward: number;
}

export interface DashboardData {
  user: User;
  wallet: WalletState;
  recentTransactions: Transaction[];
  activeMissions: Mission[];
}
