import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { count } from "console";

test("renders counter app", () => {
  render(<App />);
  const headerElement = screen.getByText(/Counter App/i);
  expect(headerElement).toBeInTheDocument();
});

// test("renders the counter app", () => {
//   render(<App />);
//   const headerElement = screen.getByText(/counter app/i);
//   expect(headerElement).toBeInTheDocument();
// });

test("initial count is 0", () => {
  render(<App />);
  const countElement = screen.getByTestId("count");
  expect(countElement).toHaveTextContent("Count: 0");
});

// test("initial count is 0", () => {
//   render(<App />);
//   const countElement = screen.getByTestId("count");
//   expect(countElement).toHaveTextContent("Count: 0");
// });

test("increment button clicked", () => {
  render(<App />);
  const incrementButton = screen.getByText(/increment/i);
  const countElement = screen.getByTestId("count");

  // fireEvent.doubleClick(incrementButton);
  fireEvent.click(incrementButton);
  expect(countElement).toHaveTextContent("Count: 1");
});

// test("increment button increases count", () => {
//   render(<App />);
//   const incrementButton = screen.getByText(/increment/i);
//   const countElement = screen.getByTestId("count");

//   fireEvent.click(incrementButton);
//   expect(countElement).toHaveTextContent("Count: 1");
// });

test("decrement button decreases count", () => {
  render(<App />);
  const decrementButton = screen.getByText(/Decrement/);
  // console.log(decrementButton);
  const countElement = screen.getByTestId("count");

  fireEvent.click(decrementButton);
  expect(countElement).toHaveTextContent("Count: -1");
});
