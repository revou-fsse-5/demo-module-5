import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "../../hooks/useToggle";

describe("useToggle", () => {
  test("should toggle from false to true", () => {
    const { result } = renderHook(() => useToggle());

    // Initial state should be false
    expect(result.current[0]).toBe(false);

    // Toggle the value to true
    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  test("should toggle from true to false", () => {
    const { result } = renderHook(() => useToggle(true));

    // Initial state should be true
    expect(result.current[0]).toBe(true);

    // Toggle the value to false
    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  test("should handle multiple toggles", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1](); // false -> true
      result.current[1](); // true -> false
      result.current[1](); // false -> true
    });

    expect(result.current[0]).toBe(true);
  });
});
