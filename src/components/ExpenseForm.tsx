"use client";

import { useState, type FormEvent } from "react";
import { CATEGORIES, type Category, type Expense } from "@/types/expense";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100/10 dark:focus:border-zinc-600";

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
      amount: Math.round(parsedAmount * 100) / 100,
      category,
      createdAt: Date.now(),
    });

    setDescription("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_9rem_9rem_auto]">
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(null);
          }}
          placeholder="Description"
          maxLength={200}
          className={fieldClass}
        />
        <input
          type="number"
          step="any"
          min="0.01"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError(null);
          }}
          placeholder="Amount"
          className={fieldClass}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className={fieldClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Add Expense
        </button>
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
