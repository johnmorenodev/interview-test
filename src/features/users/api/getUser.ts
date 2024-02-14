import { API_URL } from "../../../config";
import { User } from "../../types";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);
  return await res.json();
}
