import type { Expense } from "@/types/expense";
import { ExpenseListItem } from "./ExpenseListItem";

interface ExpenseListProps {
  expenses: Expense[];
  hasAnyExpenses: boolean;
  onDelete: (id: string) => void;
}

export function ExpenseList({
  expenses,
  hasAnyExpenses,
  onDelete,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className="py-8 text-center text-zinc-500">
        {hasAnyExpenses
          ? "No expenses in this category."
          : "No expenses yet. Add your first one above."}
      </p>
    );
  }

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseListItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
