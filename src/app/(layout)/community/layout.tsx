import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '댕냥광장',
  description: '견주들과 교류하고 반려동물에 대한 유익한 정보를 나누세요.',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
