import { UserSearch } from "./UserSearch";
import { UserSelected } from "./UserSelected";
import { UsersTable } from "./UsersTable";

export function Users() {
  return (
    <div>
      <UserSearch />
      <UsersTable />
      <UserSelected />
    </div>
  );
}
