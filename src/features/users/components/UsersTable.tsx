import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchUsers } from "../usersSlice";
import { UserRow } from "./UserRow";
import "./Users.css";

export function UsersTable() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { error, isLoading, users, searchQuery } = user;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredUsers?.map((user: any) => {
            return <UserRow user={user} key={user.id} />;
          })}
        </tbody>
      </table>
      {filteredUsers.length === 0 && <p>No users found</p>}
    </>
  );
}
