import '../styles/globals.css';
import '../styles/Font.css';
import GoToTopButton from '@/components/shared/BackToTopButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

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
        <Header />
        <div className="pt-20 font-Interop">{children}</div>
        <GoToTopButton />
        <Footer />
      </body>
    </html>
  );
}
