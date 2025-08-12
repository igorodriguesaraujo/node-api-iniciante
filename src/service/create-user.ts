import { db } from "../db";
import { users } from "../db/schema/users";

export async function createUser({ name, email, password }: any) {
  return await db.insert(users).values({
    name,
    email,
    password
  }).returning({
    id: users.id,
    email: users.email,
  })
}