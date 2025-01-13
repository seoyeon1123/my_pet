import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '댕냥터',
  description: '내 근처에 있는 [ 댕냥이들을 위한 ] 카페, 병원, 호텔 등을 찾아보아요.',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
