import groupPurchaseStatusCheck from '@/lib/groupPurchaseService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Cron job triggered');
    await groupPurchaseStatusCheck(); // 비동기 함수일 경우 await 사용
    return NextResponse.json({ message: 'Cron job scheduled successfully' });
  } catch (error) {
    console.error('Error executing cron job:', error);
    return NextResponse.json({ message: 'Error executing cron job' }, { status: 500 });
  }
}
