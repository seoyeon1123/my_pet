'use client';

import { RecoilRoot } from 'recoil';
import './styles/globals.css';
import './styles/Font.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
