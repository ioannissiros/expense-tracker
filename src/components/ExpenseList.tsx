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
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 py-10 text-center dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {hasAnyExpenses
            ? "No expenses in this category."
            : "No expenses yet. Add your first one above."}
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {expenses.map((expense) => (
        <ExpenseListItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
