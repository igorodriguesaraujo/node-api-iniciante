import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema/users";

export async function getUserById(id: string) {
  return await db
    .select()
    .from(users)
    .where(eq(users.id, id))
}
