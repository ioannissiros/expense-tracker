import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExpenseListItem } from "./ExpenseListItem";
import type { Expense } from "@/types/expense";

const expense: Expense = {
  id: "1",
  description: "Coffee",
  amount: 3.5,
  category: "Food",
  createdAt: 1,
};

describe("ExpenseListItem", () => {
  it("renders description, category, and formatted amount", () => {
    render(<ExpenseListItem expense={expense} onDelete={vi.fn()} />);
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("€3.50")).toBeInTheDocument();
  });

  it("calls onDelete with the expense id when the delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<ExpenseListItem expense={expense} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("button", { name: "Delete Coffee" }));

    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
