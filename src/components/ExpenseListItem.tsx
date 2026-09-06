import type { Category, Expense } from "@/types/expense";

interface ExpenseListItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

// Full class strings kept static (not string-interpolated) so Tailwind's
// production build scanner can find them -- interpolating a partial class
// name via a template literal caused it to stop scanning the rest of this
// file, silently dropping the classes below in the production build only.
const CATEGORY_BADGE_CLASS: Record<Category, string> = {
  Food: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Transport: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Entertainment: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Bills: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Other: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400",
};

export function ExpenseListItem({ expense, onDelete }: ExpenseListItemProps) {
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-2 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <span className="w-full min-w-0 truncate text-sm text-zinc-900 dark:text-zinc-100 sm:w-auto sm:flex-1">
        {expense.description}
      </span>
      <span className={CATEGORY_BADGE_CLASS[expense.category]}>
        {expense.category}
      </span>
      <span className="ml-auto shrink-0 text-right text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100 sm:ml-0 sm:w-20">
        €{expense.amount.toFixed(2)}
      </span>
      <button
        type="button"
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.description}`}
        className="shrink-0 rounded-full p-1 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
