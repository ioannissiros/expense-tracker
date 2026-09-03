interface ExpenseTotalProps {
  total: number;
}

export function ExpenseTotal({ total }: ExpenseTotalProps) {
  return (
    <p className="text-lg font-medium">
      Total: <span>€{total.toFixed(2)}</span>
    </p>
  );
}
