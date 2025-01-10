import '../styles/globals.css';
import '../styles/Font.css';
import GoToTopButton from '@/components/shared/BackToTopButton';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div className="pt-20  ">{children}</div>
        <GoToTopButton />
      </body>
    </html>
  );
}
