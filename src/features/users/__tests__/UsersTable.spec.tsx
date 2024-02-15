import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { UsersTable } from "../components/UsersTable";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { users } from "../../../utils/data.json";

jest.mock("../../../hooks/index.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useAppSelector);
const mockUseDispatch = jest.mocked(useAppDispatch);

describe("Users Table Component", () => {
  test("display the users table", async () => {
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        users: users,
        searchQuery: "",
      };
    });
    render(<UsersTable />);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
  });

  test("displays error screen when error has occured", async () => {
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "Error",
      };
    });
    render(<UsersTable />);

    expect(screen.getByTestId("table-error")).toBeInTheDocument();
  });

  test("displays loading screen when data is loading", async () => {
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: true,
        error: "",
      };
    });
    render(<UsersTable />);

    expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should fetch user posts when row is clicked", async () => {
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        users: users,
        searchQuery: "",
      };
    });
    render(<UsersTable />);

    fireEvent.click(screen.getAllByTestId("user-row")[0]);

    expect(screen.queryByTestId("users-table")).toBeInTheDocument();
    expect(mockedDispatch).toHaveBeenCalled();
  });

  test("displays users list", async () => {
    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        users: users,
        searchQuery: "",
      };
    });
    render(<UsersTable />);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("Gwenborough")).toBeInTheDocument();
    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
  });
});
