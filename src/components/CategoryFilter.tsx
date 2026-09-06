import { CATEGORIES, type Category } from "@/types/expense";

export type CategoryFilterValue = Category | "All";

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as CategoryFilterValue)}
      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-100/10 dark:focus:border-zinc-600"
      aria-label="Filter by category"
    >
      <option value="All">All</option>
      {CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
