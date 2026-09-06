"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseTotal } from "@/components/ExpenseTotal";
import { loadExpenses, saveExpenses } from "@/lib/storage";
import type { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reading localStorage during render (e.g. a useState initializer) would
    // desync server- and client-rendered HTML, since it doesn't exist on the
    // server. Loading it here, after mount, is the correct place for it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpenses(loadExpenses());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveExpenses(expenses);
  }, [expenses, isLoaded]);

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
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <div className="h-fit w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Expense Tracker</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track what you spend, filtered by category.
          </p>
        </div>

        <div className="mt-6">
          <ExpenseForm onAdd={handleAdd} />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <ExpenseTotal total={total} />
          <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
        </div>

        <div className="mt-2">
          <ExpenseList
            expenses={filteredExpenses}
            hasAnyExpenses={expenses.length > 0}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
