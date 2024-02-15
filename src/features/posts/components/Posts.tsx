import { useAppSelector } from "../../../hooks";
import { PostCard } from "./PostCard";
import "./Posts.css";

export function Posts() {
  const post = useAppSelector((state) => state.post);
  const { isLoading, error, posts } = post;

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="post-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="posts" data-testid="user-selected">
        {posts?.length > 0 ? `Posts: ` : "No user selected"}
      </p>
      <div>
        {posts?.length > 0 && (
          <div data-testid="user-posts">
            {posts.map((post) => {
              return <PostCard post={post} key={post.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
