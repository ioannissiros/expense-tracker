import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExpenseForm } from "./ExpenseForm";

function fillAndSubmit({
  description,
  amount,
}: {
  description?: string;
  amount?: string;
}) {
  if (description !== undefined) {
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: description },
    });
  }
  if (amount !== undefined) {
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: amount },
    });
  }
  fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));
}

describe("ExpenseForm", () => {
  it("rejects an empty description without calling onAdd", () => {
    const onAdd = vi.fn();
    render(<ExpenseForm onAdd={onAdd} />);

    fillAndSubmit({ description: "   ", amount: "5" });

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByText("Description is required.")).toBeInTheDocument();
  });

  it("rejects a missing amount without calling onAdd", () => {
    // Note: the browser's own `min="0.01"` constraint blocks submission of
    // an explicit 0 or negative value before our onSubmit handler ever
    // runs (confirmed against a real browser during manual testing) -- an
    // empty amount is the case that actually reaches our own validation.
    const onAdd = vi.fn();
    render(<ExpenseForm onAdd={onAdd} />);

    fillAndSubmit({ description: "Coffee", amount: "" });

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByText("Amount must be greater than 0.")).toBeInTheDocument();
  });

  it("calls onAdd with a well-formed expense and resets the form on valid submit", () => {
    const onAdd = vi.fn();
    render(<ExpenseForm onAdd={onAdd} />);

    fillAndSubmit({ description: "Coffee", amount: "3.5" });

    expect(onAdd).toHaveBeenCalledTimes(1);
    const expense = onAdd.mock.calls[0][0];
    expect(expense).toMatchObject({
      description: "Coffee",
      amount: 3.5,
      category: "Food",
    });
    expect(typeof expense.id).toBe("string");
    expect(typeof expense.createdAt).toBe("number");

    expect((screen.getByPlaceholderText("Description") as HTMLInputElement).value).toBe("");
    expect((screen.getByPlaceholderText("Amount") as HTMLInputElement).value).toBe("");
  });

  it("rounds the amount to 2 decimal places", () => {
    const onAdd = vi.fn();
    render(<ExpenseForm onAdd={onAdd} />);

    fillAndSubmit({ description: "Weird decimal", amount: "12.999" });

    expect(onAdd.mock.calls[0][0].amount).toBe(13);
  });

  it("clears a previous error once the user edits a field again", () => {
    const onAdd = vi.fn();
    render(<ExpenseForm onAdd={onAdd} />);

    fillAndSubmit({ description: "", amount: "5" });
    expect(screen.getByText("Description is required.")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Coffee" },
    });

    expect(screen.queryByText("Description is required.")).not.toBeInTheDocument();
  });
});
