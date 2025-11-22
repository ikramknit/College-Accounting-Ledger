
export interface Student {
  id: number;
  name: string;
  course: string;
  totalFees: number;
  paidFees: number;
}

export interface Transaction {
  id: number;
  date: string; // YYYY-MM-DD
  description: string;
  type: 'income' | 'expenditure';
  amount: number;
  category: 'fees' | 'salary' | 'utilities' | 'other';
}
