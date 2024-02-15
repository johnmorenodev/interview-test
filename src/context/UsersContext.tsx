import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Post, User } from "../features/types";
import { getPostsByUserId } from "../features/users/api/getPostsByUserId";
import { getUsers } from "../features/users/api/getUser";

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
  selectedUser: string | null;
  isPostLoading: boolean;
  postError: string;
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
  selectedUser: null,
  isPostLoading: false,
  postError: "",
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
  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
  const [postError, setPostError] = useState<string>("");

  const selectedUser =
    userPosts?.length > 0 ? getSelectedUser(userPosts[0].userId, users) : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchUsers();
  }, []);

  function handleSearch(searchQuery: string) {
    setSearchQuery(searchQuery);
  }

  async function handleSelectUser(id: number) {
    try {
      setIsPostLoading(true);
      const posts = await getPostsByUserId(id);
      setUserPosts(posts);
      setIsPostLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setPostError(error.message);
      }
      console.log("Error:", error);
      setIsPostLoading(false);
    }
  }

  function getSelectedUser(userId: number, users: User[]) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : null;
  }

  //filter users list based on search query
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
        selectedUser,
        postError,
        isPostLoading,
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
