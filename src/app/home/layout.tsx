import '../styles/globals.css';
import '../styles/Font.css';
import Header from '@/components/home/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
