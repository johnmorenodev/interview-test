import { API_URL } from "../../../config";
import { Post } from "../../users/types";

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts?userId=${userId}`);

  if (!res.ok) {
    throw new Error("Error fetching posts");
  }

  return await res.json();
}
