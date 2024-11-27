'use client';

import { RecoilRoot } from 'recoil';
import './styles/globals.css';
import './styles/Font.css';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <RecoilRoot>{children}</RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
