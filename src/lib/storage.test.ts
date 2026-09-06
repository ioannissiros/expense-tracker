import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { loadExpenses, saveExpenses } from "./storage";
import type { Expense } from "@/types/expense";

const sample: Expense = {
  id: "1",
  description: "Coffee",
  amount: 3.5,
  category: "Food",
  createdAt: 1000,
};

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an empty array when nothing is stored", () => {
    expect(loadExpenses()).toEqual([]);
  });

  it("round-trips expenses through save and load", () => {
    saveExpenses([sample]);
    expect(loadExpenses()).toEqual([sample]);
  });

  it("falls back to an empty array for corrupted JSON", () => {
    localStorage.setItem("expense-tracker:expenses", "{not valid json");
    expect(loadExpenses()).toEqual([]);
  });

  it("falls back to an empty array when the stored value isn't an array", () => {
    localStorage.setItem("expense-tracker:expenses", JSON.stringify({ foo: "bar" }));
    expect(loadExpenses()).toEqual([]);
  });

  it("does not throw when localStorage.setItem fails (e.g. quota exceeded)", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => saveExpenses([sample])).not.toThrow();
  });

  it("does not throw when localStorage.getItem fails (e.g. disabled storage)", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(loadExpenses()).toEqual([]);
  });
});
