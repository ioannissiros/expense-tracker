"use client";

import { useMemo, useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseTotal } from "@/components/ExpenseTotal";
import type { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses],
  );

  function handleAdd(expense: Expense) {
    setExpenses((prev) => [expense, ...prev]);
  }

  function handleDelete(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseTotal total={total} />
      <ExpenseList
        expenses={expenses}
        hasAnyExpenses={expenses.length > 0}
        onDelete={handleDelete}
      />
    </div>
  );
}
