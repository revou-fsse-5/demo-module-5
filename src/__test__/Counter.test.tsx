import React from "react";
import { render } from "@testing-library/react";
import { CounterProvider } from "../context/CounterContext";
import Counter from "../components/Counter";

test("renders initial count", () => {
  const { getByText } = render(
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
  expect(getByText(/Count: 0/i)).toBeInTheDocument();
});
