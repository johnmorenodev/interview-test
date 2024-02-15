import { useUsers } from "../../../context/UsersContext";
import { UserRow } from "./UserRow";
import "./Users.css";

export function UsersTable() {
  const { users, isLoading, error } = useUsers();

  if (error) {
    return (
      <div data-testid="table-error">
        <p>An error has occured: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    //display some sort of loading screen while fetching
    return <p>Loading...</p>;
  }

  return (
    <>
      <table data-testid="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Company</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => {
            return <UserRow user={user} key={user.id} />;
          })}
        </tbody>
      </table>
      {users.length === 0 && <p>No users found</p>}
    </>
  );
}
