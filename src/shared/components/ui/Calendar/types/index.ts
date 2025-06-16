import type { CalendarDate } from '@internationalized/date';

export type PositionCell = 'prev' | 'current' | 'next';
export type defaultValue = string;

export interface CalendarOptions {
  locale?: 'ru-RU' | 'en-US';
  defaultValue?: defaultValue;
  minDate?: string;
  maxDate?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export interface CalendarCell {
  day: number;
  position: PositionCell;
  weekend: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  origin: CalendarDate;
}
