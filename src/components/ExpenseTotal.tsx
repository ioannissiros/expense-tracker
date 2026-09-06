interface ExpenseTotalProps {
  total: number;
}

export function ExpenseTotal({ total }: ExpenseTotalProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Total
      </p>
      <p className="text-2xl font-semibold tabular-nums">€{total.toFixed(2)}</p>
    </div>
  );
}
