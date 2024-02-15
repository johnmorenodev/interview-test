import { useUsers } from "../../../context/UsersContext";
import { useAppDispatch } from "../../../hooks";
import { fetchPostByUserId } from "../../posts/postsSlice";
import { User } from "../types";

export function UserRow({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  return (
    <tr
      data-testid="user-row"
      onClick={() => dispatch(fetchPostByUserId(user.id))}
    >
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.company.name}</td>
    </tr>
  );
}
