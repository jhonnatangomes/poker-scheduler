import { createClient } from '@libsql/client';

export function setupDb() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return client;
}
