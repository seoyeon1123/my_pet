import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '댕냥챗',
  description: '공동구매가 성공적으로 진행되면, 참여자들과 실시간 채팅을 통해 소통할 수 있어요.',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
