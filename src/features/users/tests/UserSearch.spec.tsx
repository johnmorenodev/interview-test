import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { INITIAL_USER_CONTEXT } from "../../../context/UsersContext";
import { UserSearch } from "../components/UserSearch";

import { useUsers } from "../../../context/UsersContext";

jest.mock("../../../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

export const useUsersMock = jest.mocked(useUsers);

describe("Search Component", () => {
  test("loads and displays the search input", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
      };
    });
    render(<UserSearch />);

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
  });

  test("call handleSearch function when changing input value", async () => {
    const handleSearchMock = jest.fn();

    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isLoading: false,
        error: "",
        handleSearch: handleSearchMock,
      };
    });

    render(<UserSearch />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "test",
      },
    });

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toHaveValue("test");
    expect(handleSearchMock).toHaveBeenCalled();
  });

  test("disables input when loading", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isLoading: true,
      };
    });
    render(<UserSearch />);

    expect(screen.getByLabelText("Search User:")).toBeInTheDocument();
    expect(screen.getByLabelText("Search User:")).toHaveProperty("disabled");
  });
});
