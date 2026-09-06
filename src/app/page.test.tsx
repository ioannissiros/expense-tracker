import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

function addExpense(description: string, amount: string, category?: string) {
  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { value: description },
  });
  fireEvent.change(screen.getByPlaceholderText("Amount"), {
    target: { value: amount },
  });
  if (category) {
    // The form's category <select> has no accessible name; it's the first
    // combobox on the page (the category filter is the second).
    const formCategorySelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(formCategorySelect, { target: { value: category } });
  }
  fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));
}

describe("Home page", () => {
  it("shows the empty state before anything is added", async () => {
    render(<Home />);
    expect(
      await screen.findByText("No expenses yet. Add your first one above."),
    ).toBeInTheDocument();
    expect(screen.getByText("€0.00")).toBeInTheDocument();
  });

  it("adds an expense and updates the total", async () => {
    render(<Home />);
    await screen.findByText("No expenses yet. Add your first one above.");

    addExpense("Coffee", "3.50");

    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByTestId("expense-total")).toHaveTextContent("€3.50");
  });

  it("deletes an expense and updates the total", async () => {
    render(<Home />);
    await screen.findByText("No expenses yet. Add your first one above.");

    addExpense("Coffee", "3.50");
    await screen.findByText("Coffee");

    fireEvent.click(screen.getByRole("button", { name: "Delete Coffee" }));

    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
    expect(
      await screen.findByText("No expenses yet. Add your first one above."),
    ).toBeInTheDocument();
  });

  it("filters the list and total by category", async () => {
    render(<Home />);
    await screen.findByText("No expenses yet. Add your first one above.");

    addExpense("Coffee", "3.50", "Food");
    await screen.findByText("Coffee");
    addExpense("Bus ticket", "1.20", "Transport");
    await screen.findByText("Bus ticket");

    const filterSelect = screen.getByRole("combobox", { name: "Filter by category" });
    fireEvent.change(filterSelect, { target: { value: "Transport" } });

    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
    expect(screen.getByText("Bus ticket")).toBeInTheDocument();
    expect(screen.getByTestId("expense-total")).toHaveTextContent("€1.20");
  });

  it("shows the filtered empty state when a category has no matches", async () => {
    render(<Home />);
    await screen.findByText("No expenses yet. Add your first one above.");

    addExpense("Coffee", "3.50", "Food");
    await screen.findByText("Coffee");

    fireEvent.change(screen.getByRole("combobox", { name: "Filter by category" }), {
      target: { value: "Bills" },
    });

    expect(await screen.findByText("No expenses in this category.")).toBeInTheDocument();
  });

  it("persists expenses across a remount (simulated refresh)", async () => {
    const { unmount } = render(<Home />);
    await screen.findByText("No expenses yet. Add your first one above.");

    addExpense("Coffee", "3.50");
    await screen.findByText("Coffee");

    unmount();

    render(<Home />);
    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByTestId("expense-total")).toHaveTextContent("€3.50");
  });
});
