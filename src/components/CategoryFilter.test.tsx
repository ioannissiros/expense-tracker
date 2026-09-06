import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryFilter } from "./CategoryFilter";
import { CATEGORIES } from "@/types/expense";

describe("CategoryFilter", () => {
  it("lists All plus every category as options", () => {
    render(<CategoryFilter value="All" onChange={vi.fn()} />);
    const select = screen.getByRole("combobox", { name: "Filter by category" });
    const optionLabels = Array.from(select.querySelectorAll("option")).map(
      (o) => o.textContent,
    );
    expect(optionLabels).toEqual(["All", ...CATEGORIES]);
  });

  it("calls onChange with the selected value", () => {
    const onChange = vi.fn();
    render(<CategoryFilter value="All" onChange={onChange} />);

    fireEvent.change(screen.getByRole("combobox", { name: "Filter by category" }), {
      target: { value: "Food" },
    });

    expect(onChange).toHaveBeenCalledWith("Food");
  });
});
