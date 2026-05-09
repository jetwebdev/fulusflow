import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export const db =
  global.__dbPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = db;
}