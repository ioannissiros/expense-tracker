export const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  createdAt: number;
}
