import React from "react";
import { useCounter } from "../context/CounterContext";

const Counter: React.FC = () => {
  const { count } = useCounter();

  return <h2>Count: {count}</h2>;
};

export default Counter;
