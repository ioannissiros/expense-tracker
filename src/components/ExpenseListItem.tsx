import type { Expense } from "@/types/expense";

interface ExpenseListItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseListItem({ expense, onDelete }: ExpenseListItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-zinc-200 py-2 dark:border-zinc-800">
      <span className="min-w-0 flex-1 truncate">{expense.description}</span>
      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
        {expense.category}
      </span>
      <span className="w-20 text-right font-medium">
        €{expense.amount.toFixed(2)}
      </span>
      <button
        type="button"
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.description}`}
        className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
