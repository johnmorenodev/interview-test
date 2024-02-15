import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { INITIAL_USER_CONTEXT, useUsers } from "../../../context/UsersContext";
import { Posts } from "../../posts/components/Posts";

jest.mock("../../../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

const useUsersMock = jest.mocked(useUsers);

describe("User Posts", () => {
  test("should display loading screen during loading state", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isPostLoading: true,
      };
    });
    render(<Posts />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts")).not.toBeInTheDocument();
  });

  test("should display error screen if there is an error", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isPostLoading: false,
        postError: "Error",
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("post-error")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("should display selected user posts", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isPostLoading: false,
        userPosts: [
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
        ],
      };
    });
    render(<UserSelected />);

    expect(screen.getByTestId("user-posts")).toBeInTheDocument();
    expect(screen.queryByTestId("user-posts-empty")).not.toBeInTheDocument();
  });

  test("should show selected user name if available", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isPostLoading: false,
        selectedUser: "Leanne Graham",
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("user-selected")).toBeInTheDocument();
    expect(screen.getByTestId("user-selected")).toHaveTextContent(
      "Leanne Graham"
    );
  });

  test("should show no user selected", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        isPostLoading: false,
        selectedUser: null,
      };
    });
    render(<Posts />);

    expect(screen.getByTestId("user-selected")).toBeInTheDocument();
    expect(screen.getByTestId("user-selected")).toHaveTextContent(
      "No user selected"
    );
  });
});
