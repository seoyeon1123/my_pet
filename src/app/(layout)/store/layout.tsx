import { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: '댕냥창고',
  description: '다양한 물품을 살펴보고, 공동구매로 절약해보아요.',
};

export default function YogoBenefitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
