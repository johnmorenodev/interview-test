import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserSearch } from "../components/UserSearch";
import { useAppDispatch, useAppSelector } from "../../../hooks";

jest.mock("../../../hooks/index.ts", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useAppSelector);
const mockUseDispatch = jest.mocked(useAppDispatch);

describe("Search Component", () => {
  test("loads and displays the search input", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
      };
    });
    render(<UserSearch />);

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
  });

  test("call handleSearch function when changing input value", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
      };
    });

    const mockedDispatch = jest.fn();
    mockUseDispatch.mockImplementation(() => {
      return mockedDispatch;
    });

    render(<UserSearch />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "test",
      },
    });

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toHaveValue("test");
    expect(mockUseDispatch).toHaveBeenCalled();
  });

  test("disables input when loading", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: true,
        error: "",
      };
    });

    render(<UserSearch />);

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
    expect(screen.getByLabelText("Search User:")).toHaveProperty("disabled");
  });
});
