import { CalendarDate, DateFormatter } from '@internationalized/date';
import { DEFAULT_LOCALE } from '../constants';

export const createCalendar = (era: string, year: number, month: number, day: number) => {
  return new CalendarDate(era, year, month, day);
};

export const formatter = (options: Intl.DateTimeFormatOptions, locale = DEFAULT_LOCALE) => {
  return new DateFormatter(locale, options);
};

export const toNativeDate = (date: CalendarDate) => new Date(date.toString());

export const isBefore = (a: CalendarDate, b: CalendarDate) => a.compare(b) < 0;

export const isAfter = (a: CalendarDate, b: CalendarDate) => a.compare(b) > 0;

export const isDisabled = (
  day: CalendarDate,
  today: CalendarDate,
  min: CalendarDate,
  max: CalendarDate,
  disablePast?: boolean,
  disableFuture?: boolean,
) => {
  if (disablePast && isBefore(day, today)) return true;
  if (disableFuture && isAfter(day, today)) return true;
  if (isBefore(day, min)) return true;
  if (isAfter(day, max)) return true;
  return false;
};

export const getDateFromString = (date: string, era: string) => {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(date.trim());

  if (!match) {
    throw new Error(`Invalid date format: "${date}". Expected "YYYY-MM-DD".`);
  }

  const [year, month, day] = date.split('-');

  return createCalendar(era, Number(year), Number(month), Number(day));
};

export const getBaseDate = (locale: string): CalendarDate => {
  const sundayFirst = ['en-US'];
  const mondayFirst = ['ru-RU'];

  if (sundayFirst.includes(locale)) return new CalendarDate(1990, 1, 7);
  if (mondayFirst.includes(locale)) return new CalendarDate(1990, 1, 1);

  return new CalendarDate(1990, 1, 1);
};

export const clampMonth = (year: number, month: number, minDate: CalendarDate, maxDate: CalendarDate) => {
  if (year === minDate.year && month < minDate.month) return minDate.month;
  if (year === maxDate.year && month > maxDate.month) return maxDate.month;
  return month;
};
