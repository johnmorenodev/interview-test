import { Post } from "../types";

export function UserPostCard({ post }: { post: Post }) {
  return (
    <div className="post-card">
      <p className="post-id">Id: {post.id}</p>
      <p className="post-title">Title: {post.title}</p>
      <p className="post-body">Body: {post.body}</p>
    </div>
  );
}
