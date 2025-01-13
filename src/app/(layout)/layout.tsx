import '../styles/globals.css';
import '../styles/Font.css';
import GoToTopButton from '@/components/shared/BackToTopButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
