import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContant {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContant>(cookies(), {
    cookieName: 'dangdangnyang_salon',
    password: process.env.COOKIE_PASSWORD!,
  });
}
