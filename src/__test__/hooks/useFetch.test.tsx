import useFetch from "../../hooks/useFetch";
import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";

// Mock axios to control its behavior in the tests
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetch", () => {
  it("should return loading as true initially", async () => {
    const { result } = renderHook(() => useFetch("http://example.com/api"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should fetch data successfully", async () => {
    const mockData = { id: 1, name: "John Doe" };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("http://example.com/api")
    );

    // Wait for the hook to update after fetching data
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors", async () => {
    const mockError = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(mockError));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("http://example.com/api")
    );

    // Wait for the hook to update after fetching data
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError);
  });
});
