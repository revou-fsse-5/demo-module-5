import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CounterProvider } from "../context/CounterContext";
import Counter from "../components/Counter";
import CounterControls from "../components/CounterControls";

test("increments and decrements count", () => {
  const { getByText } = render(
    <CounterProvider>
      <Counter />
      <CounterControls />
    </CounterProvider>
  );

  const incrementButton = getByText("+");
  const decrementButton = getByText("-");
  const count = getByText(/Count: 0/i);

  fireEvent.click(incrementButton);
  expect(count).toHaveTextContent("Count: 1");

  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent("Count: 0");
});
