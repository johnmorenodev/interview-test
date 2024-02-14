import { useEffect, useState } from "react";
import { User } from "../../types";
import { getUsers } from "../api/getUser";
import { UserRow } from "./UserRow";
import "./UsersTable.css";

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

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
