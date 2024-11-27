// import { getIronSession } from 'iron-session';
// import { cookies } from 'next/headers';

// interface SessionContant {
//   id?: number;
// }

// export default async function getSession() {
//   try {
//     // 세션 객체를 가져오기
//     const session = await getIronSession<SessionContant>(cookies(), {
//       cookieName: 'dangdangnyang_salon', // 쿠키 이름
//       password: process.env.COOKIE_PASSWORD!, // 비밀 키 (환경 변수로 설정)
//     });
//     return session;
//   } catch (error) {
//     console.error('Error getting session:', error);
//     return null;
//   }
// }
