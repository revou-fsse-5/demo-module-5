import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CounterProvider } from "../context/CounterContext";
import Counter from "../components/Counter";
import CounterControls from "../components/CounterControls";

test("increments and decrements count", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );

  const incrementButton = getByRole("button", { name: "+" });
  const decrementButton = getByRole("button", { name: "-" });
  const count = getByText(/Count: 0/i);

  fireEvent.click(incrementButton);
  expect(count).toHaveTextContent("Count: 1");

  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent("Count: 0");
});

test("increments count multiple times", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );

  const incrementButton = getByRole("button", { name: "+" });
  const count = getByText(/Count: 0/i);

  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  expect(count).toHaveTextContent("Count: 3");
});

test("decrements count multiple times", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );

  const decrementButton = getByRole("button", { name: "-" });
  const count = getByText(/Count: 0/i);

  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent("Count: -3");
});

test("increments and decrements count in sequence", () => {
  const { getByRole, getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );

  const incrementButton = getByRole("button", { name: "+" });
  const decrementButton = getByRole("button", { name: "-" });
  const count = getByText(/Count: 0/i);

  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent("Count: -1");
});
