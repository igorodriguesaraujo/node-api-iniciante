import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema/users";

export async function getUserByEmail(email: string) {
  return await db
    .select()
    .from(users)
    .where(eq(users.email, email))
}
