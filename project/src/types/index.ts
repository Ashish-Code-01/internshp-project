export interface Intern {
  id: number;
  name: string;
  email: string;
  referralCode: string;
  totalRaised: number;
  totalDonations: number;
  joinDate: string;
  rank: number;
  achievements: string[];
  recentDonations: Donation[];
}

export interface Donation {
  amount: number;
  donor: string;
  date: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: Intern;
  token?: string;
  message?: string;
}