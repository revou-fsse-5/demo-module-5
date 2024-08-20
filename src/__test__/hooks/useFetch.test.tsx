import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetch", () => {
  test("should return data after fetching", async () => {
    const mockData = { name: "John Doe" };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetch("/user"));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    // After fetch
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test("should handle error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    const { result, waitForNextUpdate } = renderHook(() => useFetch("/user"));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network error");
  });

  // test("should fetch data only once on URL change", async () => {
  //   const mockData = { name: "Jane Doe" };
  //   mockedAxios.get.mockResolvedValue({ data: mockData });

  //   const { result, rerender, waitForNextUpdate } = renderHook(
  //     ({ url }) => useFetch(url),
  //     {
  //       initialProps: { url: "/user1" },
  //     }
  //   );

  //   await waitForNextUpdate();

  //   expect(result.current.data).toEqual(mockData);

  //   // Change URL and fetch again
  //   rerender({ url: "/user2" });
  //   await waitForNextUpdate();

  //   expect(result.current.data).toEqual(mockData);
  // });
});
