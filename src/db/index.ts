// Make sure to install the 'postgres' package
import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { schema } from './schema';

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({
  client: queryClient,
  schema
});