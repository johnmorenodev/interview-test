import { API_URL } from "../../../config";
import { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) {
    throw new Error("Error getting users");
  }

  return await res.json();
}
