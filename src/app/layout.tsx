'use client';

import { RecoilRoot } from 'recoil';
import './styles/globals.css';
import './styles/Font.css';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ko">
      <body>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <SessionProvider>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
