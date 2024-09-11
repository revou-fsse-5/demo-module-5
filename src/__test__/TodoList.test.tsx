import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TodoList from "../component/TodoList";

// Mock the axios module
jest.mock("axios");

// Create a mocked version of axios with TypeScript support
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TodoList", () => {
  // Before each test, set up a mock response for GET requests
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [{ id: 1, title: "Test Todo", completed: false }],
    });
  });

  // Test if the TodoList component renders correctly
  test("renders TodoList component", async () => {
    render(<TodoList />);
    // Wait for the component to render and check if the title is present
    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
  });

  // Test adding a new todo
  test("adds a new todo", async () => {
    // Mock the POST request response
    mockedAxios.post.mockResolvedValue({
      data: { id: 2, title: "New Todo", completed: false },
    });
    render(<TodoList />);

    // Get the input field and add button
    const input = screen.getByPlaceholderText("New todo");
    const addButton = screen.getByText("Add Todo");

    // Simulate typing in the input and clicking the add button
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // Wait for the new todo to appear in the document
    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  // Test updating a todo
  test("updates a todo", async () => {
    // Mock the PATCH request response
    mockedAxios.patch.mockResolvedValue({
      data: { id: 1, title: "Test Todo", completed: true },
    });
    render(<TodoList />);

    // Wait for the checkbox to be rendered, then simulate a click
    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
    });

    // Check if the PATCH request was called with the correct URL and data
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1",
      { completed: true }
    );
  });

  // Test deleting a todo
  test("deletes a todo", async () => {
    // Mock the DELETE request response
    mockedAxios.delete.mockResolvedValue({});
    render(<TodoList />);

    // Wait for the component to render, then find and click the delete button
    await waitFor(() => {
      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);
    });

    // Check if the DELETE request was called with the correct URL
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  });
});
