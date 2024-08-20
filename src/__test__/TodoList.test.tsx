import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TodoList from "../component/TodoList";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TodoList", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [{ id: 1, title: "Test Todo", completed: false }],
    });
  });

  test("renders TodoList component", async () => {
    render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo List")).toBeInTheDocument();
    });
  });

  test("adds a new todo", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { id: 2, title: "New Todo", completed: false },
    });
    render(<TodoList />);

    const input = screen.getByPlaceholderText("New todo");
    const addButton = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  test("updates a todo", async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { id: 1, title: "Test Todo", completed: true },
    });
    render(<TodoList />);

    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/1",
        { completed: true }
      );
    });
  });

  test("deletes a todo", async () => {
    mockedAxios.delete.mockResolvedValue({});
    render(<TodoList />);

    await waitFor(() => {
      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
    });
  });
});
