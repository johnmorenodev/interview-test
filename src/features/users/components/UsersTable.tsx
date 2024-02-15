import { useEffect } from "react";
import { useUsers } from "../../../context/UsersContext";
import { getUsers } from "../api/getUser";
import { UserRow } from "./UserRow";
import "./Users.css";

export function UsersTable() {
  const { users, setUsers, isLoading, setIsLoading, error, setError } =
    useUsers();

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

  if (error) {
    return (
      <div>
        <p>An error has occured: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    //display some sort of loading screen while fetching
    return <p>Loading...</p>;
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
      </tr>
      {users?.map((user) => {
        return <UserRow user={user} key={user.id} />;
      })}
    </table>
  );
}
