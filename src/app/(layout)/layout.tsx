// RootLayout 컴포넌트 수정
import '../styles/globals.css';
import '../styles/Font.css';
import GoToTopButton from '@/components/shared/BackToTopButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: {
    template: '%s | 댕냥살롱',
    default: '댕냥살롱',
  },
  icons: {
    icon: '/cat&dog.png',
  },
  description: '안녕하세요. 댕냥살롱입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Head>
          <meta property="og:title" content="댕냥살롱" />
          <meta property="og:description" content="댕냥살롱은 반려동물과 함께하는 즐거운 공간입니다." />
          <meta property="og:image" content="/images/cat&dog.png" />
          <meta property="og:url" content="https://mypat.vercel.app" />
          <meta property="og:type" content="website" />
        </Head>
        <Header />
        <div className="pt-20 font-Interop">{children}</div>
        <GoToTopButton />
        <Footer />
      </body>
    </html>
  );
}
