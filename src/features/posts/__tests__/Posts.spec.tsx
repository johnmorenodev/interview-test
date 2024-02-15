import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useAppSelector } from "../../../hooks";
import { posts } from "../../../utils/data.json";
import { Posts } from "../../posts/components/Posts";

jest.mock("../../../hooks/index.ts", () => ({
  useAppSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useAppSelector);

describe("User Posts", () => {
  test("should display loading screen during loading state", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: true,
      };
    });
    render(<Posts />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts")).not.toBeInTheDocument();
  });

  test("should display error screen if there is an error", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        error: "Error",
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("post-error")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("should display selected user posts", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        posts: posts,
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("user-posts")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts-empty")).not.toBeInTheDocument();
  });

  test("should show selected user name if available", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        posts: posts,
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("user-selected")).toBeInTheDocument();
    expect(screen.getByTestId("user-selected")).toHaveTextContent("Posts");
  });

  test("should show no user selected", async () => {
    mockedUseSelector.mockImplementation(() => {
      return {
        isLoading: false,
        error: "",
        posts: [],
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("user-selected")).toBeInTheDocument();
    expect(screen.getByTestId("user-selected")).toHaveTextContent(
      "No user selected"
    );
  });
});
