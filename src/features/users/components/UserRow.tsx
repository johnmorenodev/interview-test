import { User } from "../../types";

export function UserRow({ user }: { user: User }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.company.name}</td>
    </tr>
  );
}
