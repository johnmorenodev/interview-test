import { useUsers } from "../../../context/UsersContext";

export function UserSelected() {
  const { userPosts } = useUsers();

  return (
    <div>
      <p className="posts">User Posts</p>
      <div>
        {userPosts?.length === 0 && <p>No User Posts Found</p>}
        {userPosts?.length > 0 &&
          userPosts.map((post) => {
            return (
              <div className="post-card" key={post.id}>
                <p className="post-id">Id: {post.id}</p>
                <p className="post-title">Title: {post.title}</p>
                <p className="post-body">Body: {post.body}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
