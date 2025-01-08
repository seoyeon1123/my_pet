import { isToday, parseISO } from 'date-fns';

export const formatToWon = (price: number | string | null) => {
  if (price === null) return '무료';
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${numericPrice.toLocaleString('ko')} 원`;
};

export const stripTags = (input: string) => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.body.textContent || ''; // HTML 엔티티를 변환한 후 텍스트 반환
};

export function formatToTime(date: string): string {
  const time = new Date(date);

  const formatter = new Intl.DateTimeFormat('ko', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formatter.format(time);
}

export function formatToDayAndTime(date: string): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
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

export const formatDateWeek = (date: string | Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}. ${
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][d.getDay()]
  }`;
};

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2) + ' km';
};

export function formatToYearMonthDay(date: string | Date | null | undefined): string {
  // date가 string이라면 Date 객체로 변환
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // date가 유효한 Date 객체인지 확인
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  // 날짜 포맷팅
  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', // '2024'
    month: 'long', // 'November'
    day: '2-digit', // '24'
  });

  return dateFormatter.format(dateObj);
}
