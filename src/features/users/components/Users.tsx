import { UserSearch } from "./UserSearch";
import { UsersTable } from "./UsersTable";
import "./Users.css";

export function Users() {
  return (
    <div>
      <UserSearch />
      <UsersTable />
    </div>
  );
}
