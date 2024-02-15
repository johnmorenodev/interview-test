import { useUsers } from "../../../context/UsersContext";
import { User } from "../../types";

export function UserRow({ user }: { user: User }) {
  const { handleSelectUser } = useUsers();
  return (
    <tr onClick={() => handleSelectUser(user.id)}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.company.name}</td>
    </tr>
  );
}
