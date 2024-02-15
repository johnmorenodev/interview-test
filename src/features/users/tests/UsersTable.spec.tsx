import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { INITIAL_USER_CONTEXT, useUsers } from "../../../context/UsersContext";
import { UsersTable } from "../components/UsersTable";

jest.mock("../../../context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

const useUsersMock = jest.mocked(useUsers);

describe("Users Table Component", () => {
  test("display the users table", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        users: [],
      };
    });
    render(<UsersTable />);

    expect(screen.getByTestId("users-table")).toBeInTheDocument();
  });

  test("displays error screen when error has occured", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        error: "Error has occured",
      };
    });
    render(<UsersTable />);

    expect(screen.getByTestId("table-error")).toBeInTheDocument();
  });

  test("displays loading screen when data is loading", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        users: [],
        isLoading: true,
      };
    });
    render(<UsersTable />);

    expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should fetch user posts when row is clicked", async () => {
    const handleSelectUserMock = jest.fn();
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        users: [
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ],
        handleSelectUser: handleSelectUserMock,
      };
    });
    render(<UsersTable />);

    fireEvent.click(screen.getByTestId("user-row"));

    expect(screen.queryByTestId("users-table")).toBeInTheDocument();
    expect(handleSelectUserMock).toHaveBeenCalled();
  });

  test("displays users list", async () => {
    useUsersMock.mockImplementation(() => {
      return {
        ...INITIAL_USER_CONTEXT,
        users: [
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
          {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
            email: "Shanna@melissa.tv",
            address: {
              street: "Victor Plains",
              suite: "Suite 879",
              city: "Wisokyburgh",
              zipcode: "90566-7771",
              geo: {
                lat: "-43.9509",
                lng: "-34.4618",
              },
            },
            phone: "010-692-6593 x09125",
            website: "anastasia.net",
            company: {
              name: "Deckow-Crist",
              catchPhrase: "Proactive didactic contingency",
              bs: "synergize scalable supply-chains",
            },
          },
        ],
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
