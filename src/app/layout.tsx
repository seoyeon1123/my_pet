'use client';

import { RecoilRoot } from 'recoil';
import './styles/globals.css';
import './styles/Font.css';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

        <SessionProvider>
          <RecoilRoot>{children}</RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
