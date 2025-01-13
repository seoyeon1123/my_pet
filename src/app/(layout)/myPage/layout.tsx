import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '댕냥살롱에서 활동을 확인해보세요. ',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
