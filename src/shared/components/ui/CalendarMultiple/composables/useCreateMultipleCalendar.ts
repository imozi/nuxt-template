import {
  type CalendarDate,
  today as now,
  getLocalTimeZone,
  getDayOfWeek,
  getWeeksInMonth,
  startOfMonth,
  isSameMonth,
  isSameDay,
  isWeekend,
  isToday,
} from '@internationalized/date';

import { DEFAULT_LOCALE, BASE_YEAR, GAP_YEAR, WEEK_DAYS, MONTH } from '../constants';
import {
  getBaseDate,
  getDateFromString,
  formatter,
  toNativeDate,
  isBefore,
  isDisabled,
  clampMonth,
  createCalendar,
} from '../utils';

type PositionCell = 'prev' | 'current' | 'next';
type defaultValue = string[];

interface CalendarOptions {
  locale?: 'ru-RU' | 'en-US';
  defaultValues?: defaultValue;
  minDate?: string;
  maxDate?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
}

interface CalendarCell {
  day: number;
  position: PositionCell;
  weekend: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  origin: CalendarDate;
}

export const useCreateMultipleCalendar = (options?: CalendarOptions) => {
  const TODAY = now(getLocalTimeZone());
  const LOCALE = options?.locale ?? DEFAULT_LOCALE;
  const BASE_DATE = getBaseDate(LOCALE);
  const MIN_DATE = options?.minDate
    ? getDateFromString(options.minDate, TODAY.era)
    : createCalendar(TODAY.era, BASE_YEAR, 1, 1);
  const MAX_DATE = options?.maxDate
    ? getDateFromString(options.maxDate, TODAY.era)
    : createCalendar(TODAY.era, TODAY.year + GAP_YEAR, 12, 31);

  const selected = shallowRef<CalendarDate[]>(
    options?.defaultValues?.map((dateStr) => getDateFromString(dateStr, TODAY.era)) ?? [],
  );

  const currentDate = shallowRef(
    options?.defaultValues?.[0]
      ? getDateFromString(options.defaultValues[0], TODAY.era)
      : options?.maxDate && isBefore(MAX_DATE, TODAY)
        ? createCalendar(MAX_DATE.era, MAX_DATE.year, MAX_DATE.month, MAX_DATE.day)
        : createCalendar(TODAY.era, TODAY.year, TODAY.month, TODAY.day),
  );

  const start = computed(() => startOfMonth(currentDate.value));
  const offset = computed(() => getDayOfWeek(start.value, LOCALE));
  const weeks = computed(() => getWeeksInMonth(currentDate.value, LOCALE));
  const calendarStart = computed(() => start.value.subtract({ days: offset.value }));
  const currentYear = computed(() => currentDate.value.year);
  const currentMonth = computed(() => currentDate.value.month);
  const totalCells = weeks.value * WEEK_DAYS;

  const years = computed(() => {
    return Array.from({ length: MAX_DATE.year - MIN_DATE.year + 1 }, (_, i) => {
      const date = MIN_DATE.add({ years: i });

      return {
        value: date.year,
        selected: currentYear.value === date.year,
      };
    });
  });

  const months = computed(() => {
    const df = formatter({ month: 'long' }, LOCALE);

    return Array.from({ length: MONTH }, (_, i) => {
      const date = BASE_DATE.add({ months: i });

      const isDisabledMinDate = date.month < MIN_DATE.month && currentDate.value.year === MIN_DATE.year;
      const isDisabledMaxDate = date.month > MAX_DATE.month && currentDate.value.year === MAX_DATE.year;

      return {
        value: date.month,
        label: df.format(toNativeDate(date)),
        selected: currentMonth.value === date.month,
        disabled: isDisabledMinDate || isDisabledMaxDate,
      };
    });
  });

  const days: ComputedRef<CalendarCell[]> = computed(() => {
    return Array.from({ length: totalCells }, (_, i) => {
      const day = calendarStart.value.add({ days: i });
      const isCurrentMonth = isSameMonth(day, currentDate.value);
      const position = isCurrentMonth ? 'current' : isBefore(day, currentDate.value) ? 'prev' : 'next';
      const weekend = isWeekend(day, LOCALE);

      return {
        day: day.day,
        position,
        weekend,
        today: isToday(day, getLocalTimeZone()),
        selected: selected.value ? selected.value.some((s) => isSameDay(s, day)) : false,
        disabled: isDisabled(day, TODAY, MIN_DATE, MAX_DATE, options?.disablePast, options?.disableFuture),
        origin: day,
      };
    });
  });

  const daysWeek = (() => {
    const df = formatter({ weekday: 'short' }, LOCALE);

    return Array.from({ length: WEEK_DAYS }, (_, i) => {
      const day = BASE_DATE.add({ days: i });

      return df.format(toNativeDate(day));
    });
  })();

  const isPrevMonth = computed(() => {
    const minDateYear = MIN_DATE.year;
    const minDateMonth = MIN_DATE.month;
    const year = currentYear.value;
    const month = currentMonth.value;

    return year > minDateYear || (year === minDateYear && month > minDateMonth);
  });

  const isNextMonth = computed(() => {
    const maxDateYear = MAX_DATE.year;
    const maxDateMonth = MAX_DATE.month;
    const year = currentYear.value;
    const month = currentMonth.value;

    return year < maxDateYear || (year === maxDateYear && month < maxDateMonth);
  });

  const isNextYear = computed(() => {
    const maxDateYear = MAX_DATE.year;
    const year = currentYear.value;
    return year < maxDateYear;
  });

  const isPrevYear = computed(() => {
    const minDateYear = MIN_DATE.year;
    const year = currentYear.value;
    return year > minDateYear;
  });

  const nextMonth = () => {
    if (!isNextMonth.value) {
      return;
    }

    currentDate.value = currentDate.value.add({ months: 1 });
  };

  const prevMonth = () => {
    if (!isPrevMonth.value) {
      return;
    }

    currentDate.value = currentDate.value.subtract({ months: 1 });
  };

  const prevYear = () => {
    if (currentDate.value.year === MIN_DATE.year) {
      return;
    }

    if (currentDate.value.month < MIN_DATE.month) {
      const prevYear = currentDate.value.subtract({ years: 1 });
      currentDate.value = createCalendar(currentDate.value.era, prevYear.year, MIN_DATE.month, 1);
      return;
    }

    currentDate.value = currentDate.value.subtract({ years: 1 });
  };

  const nextYear = () => {
    if (currentDate.value.year === MAX_DATE.year) {
      return;
    }

    if (currentDate.value.month > MAX_DATE.month) {
      const nextYear = currentDate.value.add({ years: 1 });
      currentDate.value = createCalendar(currentDate.value.era, nextYear.year, MAX_DATE.month, 1);
      return;
    }

    currentDate.value = currentDate.value.add({ years: 1 });
  };

  const setMonth = (month: (typeof months.value)[number]) => {
    if (month.disabled) {
      return;
    }

    if (month.value === currentMonth.value) {
      return;
    }

    currentDate.value = createCalendar(currentDate.value.era, currentDate.value.year, month.value, 1);
  };

  const setYear = (year: (typeof years.value)[number]) => {
    if (year.value === currentDate.value.year) {
      return;
    }

    const clampedMonth = clampMonth(year.value, currentMonth.value, MIN_DATE, MAX_DATE);

    currentDate.value = createCalendar(currentDate.value.era, year.value, clampedMonth, 1);
  };

  const select = (date: CalendarCell) => {
    if (date.disabled) {
      return;
    }

    const index = selected.value.findIndex((d) => isSameDay(d, date.origin));

    if (index !== -1) {
      selected.value = [...selected.value.slice(0, index), ...selected.value.slice(index + 1)].sort((a, b) =>
        a.compare(b),
      );
    } else {
      selected.value = [...selected.value, date.origin].sort((a, b) => a.compare(b));
    }

    if (date.position === 'prev') {
      prevMonth();
      return;
    }

    if (date.position === 'next') {
      nextMonth();
    }
  };

  return {
    years,
    months,
    days,
    daysWeek,
    currentMonth,
    currentYear,
    selected,
    isPrevYear,
    isNextYear,
    isPrevMonth,
    isNextMonth,
    actions: {
      prevYear,
      nextYear,
      prevMonth,
      nextMonth,
      setYear,
      setMonth,
      select,
    },
  };
};
