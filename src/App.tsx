import React from "react";
import { CounterProvider } from "./context/CounterContext";
import Counter from "./components/Counter";
import CounterControls from "./components/CounterControls";

const App: React.FC = () => {
  return (
    <CounterProvider>
      <div>
        <h1>React Context with TypeScript Demo</h1>
        <Counter />
        <CounterControls />
      </div>
    </CounterProvider>
  );
};

export default App;
