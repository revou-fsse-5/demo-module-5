import React, { useState, useEffect } from "react";

interface CounterProps {
  initialCount?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount);
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([initialCount]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + step);
    setLastOperation("increment");
    addToHistory(count + step);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - step);
    setLastOperation("decrement");
    addToHistory(count - step);
  };

  const reset = () => {
    setCount(initialCount);
    setLastOperation("reset");
    setHistory([initialCount]);
  };

  const addToHistory = (newCount: number) => {
    setHistory((prevHistory) => [...prevHistory, newCount].slice(-5));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10);
    if (!isNaN(newCount)) {
      setCount(newCount);
      addToHistory(newCount);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Advanced Counter App</h1>
      <p className="text-xl mb-4" data-testid="count">
        Count: {count}
      </p>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={increment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="setCount" className="block mb-2">
          Set count:
        </label>
        <input
          id="setCount"
          type="number"
          value={count}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <p className="mb-2">Step size: {step}</p>
      <p className="mb-2">Last operation: {lastOperation || "None"}</p>
      <div>
        <h2 className="text-lg font-semibold mb-2">
          History (last 5 changes):
        </h2>
        <ul className="list-disc list-inside">
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
