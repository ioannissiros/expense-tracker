"use client";

import { useState, type FormEvent } from "react";
import { CATEGORIES, type Category, type Expense } from "@/types/expense";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const parsedAmount = Number(amount);

    if (!trimmedDescription) {
      setError("Description is required.");
      return;
    }

    if (!(parsedAmount > 0)) {
      setError("Amount must be greater than 0.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: parsedAmount,
      category,
      createdAt: Date.now(),
    });

    setDescription("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="flex-1 rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full rounded border border-zinc-300 px-3 py-2 sm:w-32 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full rounded border border-zinc-300 px-3 py-2 sm:w-40 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
        >
          Add Expense
        </button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </form>
  );
}
