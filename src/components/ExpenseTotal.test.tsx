import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExpenseTotal } from "./ExpenseTotal";

describe("ExpenseTotal", () => {
  it("formats the total with two decimal places", () => {
    render(<ExpenseTotal total={5} />);
    expect(screen.getByText("€5.00")).toBeInTheDocument();
  });

  it("renders zero correctly", () => {
    render(<ExpenseTotal total={0} />);
    expect(screen.getByText("€0.00")).toBeInTheDocument();
  });
});
