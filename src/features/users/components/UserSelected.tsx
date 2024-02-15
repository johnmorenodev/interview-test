import { useUsers } from "../../../context/UsersContext";
import { UserPostCard } from "./UserPostCard";

export function UserSelected() {
  const { userPosts, selectedUser } = useUsers();

  return (
    <div>
      <p className="posts">
        {selectedUser ? `Posts of ${selectedUser}` : "No user selected"}
      </p>
      <div>
        {selectedUser && userPosts?.length === 0 && <p>No User Posts Found</p>}
        {userPosts?.length > 0 &&
          userPosts.map((post) => {
            return <UserPostCard post={post} key={post.id} />;
          })}
      </div>
    </div>
  );
}
