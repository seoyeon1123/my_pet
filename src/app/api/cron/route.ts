// /src/app/api/cron/route.ts
import scheduleCronJob from '@/lib/cronScheduler';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Cron job triggered');
    scheduleCronJob();
    return NextResponse.json({ message: 'Cron job scheduled successfully' });
  } catch (error) {
    console.error('Error executing cron job:', error);
    return NextResponse.json({ message: 'Error executing cron job' }, { status: 500 });
  }
}
