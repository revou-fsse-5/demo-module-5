import React from "react";
import { useCounter } from "../context/CounterContext";

const CounterControls: React.FC = () => {
  const { increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default CounterControls;
