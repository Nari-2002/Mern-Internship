export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type NewExpense = Omit<Expense, 'id'>;