import { useEffect, useState } from "react";
import "./UsersTable.css";
import { getUsers } from "../api/getUser";
import { User } from "../../types";

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
        return (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address.city}</td>
            <td>{user.company.name}</td>
          </tr>
        );
      })}
    </table>
  );
}
