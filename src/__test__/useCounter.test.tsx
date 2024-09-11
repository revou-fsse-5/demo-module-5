// useCounter.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "../component/useCounter";

describe("useCounter", () => {
  test("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test("should initialize with provided value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test("should increment the counter", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  test("should decrement the counter", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });

  test("should reset the counter", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });

  test("should update reset value when initial value changes", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      { initialProps: { initialValue: 0 } }
    );

    rerender({ initialValue: 10 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});
