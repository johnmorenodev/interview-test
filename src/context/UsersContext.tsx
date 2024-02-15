import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { User } from "../features/types";

interface UserContext {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleSearch: (s: string) => void;
}

const INITIAL_USER_CONTEXT = {
  users: [],
  setUsers: () => {},
  isLoading: true,
  setIsLoading: () => {},
  error: "",
  setError: () => {},
  handleSearch: () => {},
};
const UserContext = createContext<UserContext>(INITIAL_USER_CONTEXT);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch(searchQuery: string) {
    setSearchQuery(searchQuery);
  }

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;
  return (
    <UserContext.Provider
      value={{
        users: filteredUsers,
        setUsers,
        isLoading,
        setIsLoading,
        error,
        setError,
        handleSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  return context;
};
