import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  jwt: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: '__session',
    },
  });

export { getSession, commitSession, destroySession };
