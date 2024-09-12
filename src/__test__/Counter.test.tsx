import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CounterProvider } from "../context/CounterContext";
import Counter from "../components/Counter";
import CounterControls from "../components/CounterControls";

test("renders initial count", () => {
  const { getByText } = render(
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
  expect(getByText(/Count: 0/i)).toBeInTheDocument();
});

test("renders updated count after increment", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );
  const count = getByText(/Count: 0/i);
  fireEvent.click(getByRole("button", { name: "+" }));
  expect(count).toHaveTextContent("Count: 1");
});

test("renders updated count after decrement", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );
  const count = getByText(/Count: 0/i);
  fireEvent.click(getByRole("button", { name: "-" }));
  expect(count).toHaveTextContent("Count: -1");
});

test("renders updated count after multiple increments and decrements", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );
  const count = getByText(/Count: 0/i);
  fireEvent.click(getByRole("button", { name: "+" }));
  fireEvent.click(getByRole("button", { name: "+" }));
  fireEvent.click(getByRole("button", { name: "-" }));
  expect(count).toHaveTextContent("Count: 1");
});
