import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../component/Counter";

describe("Counter Component", () => {
  test("renders with initial count of 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("renders with custom initial count", () => {
    render(<Counter initialCount={10} />);
    expect(screen.getByText("Count: 10")).toBeInTheDocument();
  });

  test("increments count", async () => {
    render(<Counter />);
    userEvent.click(screen.getByText("Increment"));
    await waitFor(() => {
      expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });
  });

  test("decrements count", async () => {
    render(<Counter />);
    userEvent.click(screen.getByText("Decrement"));
    await waitFor(() => {
      expect(screen.getByText("Count: -1")).toBeInTheDocument();
    });
  });

  test("resets count", async () => {
    render(<Counter initialCount={5} />);
    userEvent.click(screen.getByText("Increment"));
    userEvent.click(screen.getByText("Reset"));
    await waitFor(() => {
      expect(screen.getByText("Count: 5")).toBeInTheDocument();
    });
  });

  test("uses custom step size", async () => {
    render(<Counter step={5} />);
    userEvent.click(screen.getByText("Increment"));
    await waitFor(() => {
      expect(screen.getByText("Count: 5")).toBeInTheDocument();
    });
  });

  test("displays last operation", async () => {
    render(<Counter />);
    userEvent.click(screen.getByText("Increment"));
    await waitFor(() => {
      expect(screen.getByText("Last operation: increment")).toBeInTheDocument();
    });
  });

  test("displays history", async () => {
    render(<Counter />);
    userEvent.click(screen.getByText("Increment"));
    userEvent.click(screen.getByText("Increment"));
    await waitFor(() => {
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  test("limits history to 5 items", async () => {
    render(<Counter />);
    for (let i = 0; i < 6; i++) {
      userEvent.click(screen.getByText("Increment"));
    }
    await waitFor(() => {
      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.getByText("6")).toBeInTheDocument();
    });
  });

  test("can type into a hypothetical input field", async () => {
    render(<Counter />);
    const input = screen.getByLabelText("Set count:") as HTMLInputElement; // Cast to HTMLInputElement
    userEvent.type(input, "42");
    await waitFor(() => {
      expect(Number(input.value)).toBe(42); // Convert the input value to a number and compare
    });
  });

  test("keyboard interaction increments count", async () => {
    render(<Counter />);
    const incrementButton = screen.getByText("Increment");
    userEvent.tab();
    expect(incrementButton).toHaveFocus();
    userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });
  });
});
