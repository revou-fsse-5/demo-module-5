import React, { useState } from "react";
import "./App.css";
import Counter from "./component/Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter />
      {/* <h1>Counter App</h1>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button> */}
    </div>
  );
}

export default App;
