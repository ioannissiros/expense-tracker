import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExpenseList } from "./ExpenseList";
import type { Expense } from "@/types/expense";

const expenses: Expense[] = [
  { id: "1", description: "Coffee", amount: 3.5, category: "Food", createdAt: 2 },
  { id: "2", description: "Bus ticket", amount: 1.2, category: "Transport", createdAt: 1 },
];

describe("ExpenseList", () => {
  it("shows the no-expenses-at-all empty state", () => {
    render(<ExpenseList expenses={[]} hasAnyExpenses={false} onDelete={vi.fn()} />);
    expect(screen.getByText("No expenses yet. Add your first one above.")).toBeInTheDocument();
  });

  it("shows the filter-matches-nothing empty state", () => {
    render(<ExpenseList expenses={[]} hasAnyExpenses={true} onDelete={vi.fn()} />);
    expect(screen.getByText("No expenses in this category.")).toBeInTheDocument();
  });

  it("renders one row per expense", () => {
    render(<ExpenseList expenses={expenses} hasAnyExpenses={true} onDelete={vi.fn()} />);
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Bus ticket")).toBeInTheDocument();
  });
});
