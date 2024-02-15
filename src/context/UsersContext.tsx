import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Post, User } from "../features/types";
import { API_URL } from "../config";

interface UserContext {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  handleSearch: (s: string) => void;
  handleSelectUser: (id: number) => void;
  userPosts: Post[];
}

const INITIAL_USER_CONTEXT = {
  users: [],
  setUsers: () => {},
  isLoading: true,
  setIsLoading: () => {},
  error: "",
  setError: () => {},
  handleSearch: () => {},
  handleSelectUser: () => {},
  userPosts: [],
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
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  function handleSearch(searchQuery: string) {
    setSearchQuery(searchQuery);
  }

  async function handleSelectUser(id: number) {
    const res = await fetch(`${API_URL}/posts?userId=${id}`);
    const userPosts = await res.json();

    setUserPosts(userPosts);
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
        handleSelectUser,
        userPosts,
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
