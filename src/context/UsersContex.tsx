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
}

const INITIAL_USER_CONTEXT = {
  users: [],
  setUsers: () => {},
  isLoading: true,
  setIsLoading: () => {},
  error: "",
  setError: () => {},
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
  return (
    <UserContext.Provider
      value={{ users, setUsers, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  return context;
};
