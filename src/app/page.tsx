"use client";

import { useMemo, useState } from "react";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseTotal } from "@/components/ExpenseTotal";
import type { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>("All");

  const filteredExpenses = useMemo(
    () =>
      categoryFilter === "All"
        ? expenses
        : expenses.filter((e) => e.category === categoryFilter),
    [expenses, categoryFilter],
  );

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
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
      <div className="flex items-center justify-between">
        <ExpenseTotal total={total} />
        <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
      </div>
      <ExpenseList
        expenses={filteredExpenses}
        hasAnyExpenses={expenses.length > 0}
        onDelete={handleDelete}
      />
    </div>
  );
}
