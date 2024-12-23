import { isToday, parseISO } from 'date-fns';

export const formatToWon = (price: number | string | null) => {
  if (price === null) return '무료';
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${numericPrice.toLocaleString('ko')} 원`;
};

export const stripTags = (input: string) => {
  return input.replace(/<\/?[^>]+(>|$)/g, '');
};

export function formatToTime(date: string): string {
  const time = new Date(date);

  const formatter = new Intl.DateTimeFormat('ko', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Ensures that the time is displayed in 12-hour format with AM/PM
  });

  return formatter.format(time);
}

export function formatToDayAndTime(date: string): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date'; // 유효하지 않은 날짜일 경우 반환
  }

  // 날짜 부분 포맷팅
  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long', // 'September'
    day: '2-digit', // '02'
  });

  // 시간 부분 포맷팅
  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12시간 형식
  });

  // 날짜와 시간 포맷팅
  const formattedDate = dateFormatter.format(dateObj);
  const formattedTime = timeFormatter.format(dateObj);

  return `${formattedDate} ${formattedTime}`;
}

export function formatDate(date: string): string {
  const parsedDate = parseISO(date);
  return isToday(parsedDate) ? formatToTime(date) : formatToDayAndTime(date);
}
