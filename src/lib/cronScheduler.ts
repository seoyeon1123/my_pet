// /src/lib/cronScheduler.ts
import cron from 'node-cron';
import groupPurchaseStatusCheck from './groupPurchaseService';

const scheduleCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Cron job triggered at midnight');
    await groupPurchaseStatusCheck();
  });
};

export const initializeCronJob = () => {
  console.log('Initializing cron job...');
  scheduleCronJob();
};

export default scheduleCronJob;
