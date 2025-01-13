import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '댕냥친구소',
  description: '강아지부터 고양이까지, 다양한 친구를 만나보세요!',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
