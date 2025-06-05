import {
  CalendarDate,
  today as now,
  getLocalTimeZone,
  getDayOfWeek,
  getWeeksInMonth,
  startOfMonth,
  DateFormatter,
} from '@internationalized/date';

type PositionCell = 'prev' | 'current' | 'next';

interface CalendarOptions {
  locale?: 'ru-RU' | 'en-US';
  minDate?: string;
  maxDate?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  initialDate?: string;
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

const DEFAULT_LOCALE = 'ru-RU';
const WEEK_DAYS = 7;
const MONTH = 12;
const GAP_YEAR = 12;
const BASE_YEAR = 1900;

const createCalendar = (era: string, year: number, month: number, day: number) => {
  return new CalendarDate(era, year, month, day);
};
const formatter = (options: Intl.DateTimeFormatOptions, locale = DEFAULT_LOCALE) => {
  return new DateFormatter(locale, options);
};
const toNativeDate = (date: CalendarDate) => new Date(date.toString());
const isSameMonth = (a: CalendarDate, b: CalendarDate) => a.year === b.year && a.month === b.month;
const isBefore = (a: CalendarDate, b: CalendarDate) => a.compare(b) < 0;
const isAfter = (a: CalendarDate, b: CalendarDate) => a.compare(b) > 0;
const isSameDay = (a: CalendarDate, b: CalendarDate) => a.compare(b) === 0;
const isDisabled = (
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
const getDateFromString = (date: string, era: string) => {
  const [year, month, day] = date.split('-');
  return createCalendar(era, Number(year), Number(month), Number(day));
};

const getBaseDate = (locale: string): CalendarDate => {
  const sundayFirst = ['en-US'];
  const mondayFirst = ['ru-RU'];

  if (sundayFirst.includes(locale)) return new CalendarDate(1990, 1, 7);
  if (mondayFirst.includes(locale)) return new CalendarDate(1990, 1, 1);

  return new CalendarDate(1990, 1, 1);
};

const getWeekendsDays = (locale: string): number[] => {
  const sundayFirst = ['en-US'];
  const mondayFirst = ['ru-RU'];
  if (sundayFirst.includes(locale)) return [0, 6];
  if (mondayFirst.includes(locale)) return [5, 6];
  return [0, 6];
};

export const useCreateCalendar = (options?: CalendarOptions) => {
  const today = now(getLocalTimeZone());

  const LOCALE = options?.locale ?? DEFAULT_LOCALE;
  const BASE_DATE = getBaseDate(LOCALE);
  const MIN_DATE = options?.minDate ? getDateFromString(options.minDate, today.era) : createCalendar(today.era, BASE_YEAR, 1, 1);
  const MAX_DATE = options?.maxDate
    ? getDateFromString(options.maxDate, today.era)
    : createCalendar(today.era, today.year + GAP_YEAR, 12, 31);

  const selected = shallowRef<CalendarDate | null>(options?.initialDate ? getDateFromString(options.initialDate, today.era) : null);

  const currentDate = shallowRef(
    options?.initialDate
      ? getDateFromString(options.initialDate, today.era)
      : options?.maxDate
        ? createCalendar(MAX_DATE.era, MAX_DATE.year, MAX_DATE.month, MAX_DATE.day)
        : createCalendar(today.era, today.year, today.month, today.day),
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

      const isDisabledminDate = date.month < MIN_DATE.month && currentDate.value.year === MIN_DATE.year;
      const isDisabledmaxDate = date.month > MAX_DATE.month && currentDate.value.year === MAX_DATE.year;

      return {
        value: date.month,
        label: df.format(toNativeDate(date)),
        selected: currentMonth.value === date.month,
        disabled: isDisabledminDate || isDisabledmaxDate,
      };
    });
  });

  const days: ComputedRef<CalendarCell[]> = computed(() => {
    return Array.from({ length: totalCells }, (_, i) => {
      const day = calendarStart.value.add({ days: i });
      const isCurrentMonth = isSameMonth(day, currentDate.value);
      const position = isCurrentMonth ? 'current' : isBefore(day, currentDate.value) ? 'prev' : 'next';
      const weekend = getWeekendsDays(LOCALE).includes(getDayOfWeek(day, LOCALE));

      return {
        day: day.day,
        position,
        weekend,
        today: isSameDay(today, day),
        selected: selected.value ? isSameDay(selected.value, day) : false,
        disabled: isDisabled(day, today, MIN_DATE, MAX_DATE, options?.disablePast, options?.disableFuture),
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

    if (currentDate.value.month < MIN_DATE.month && year.value === MIN_DATE.year) {
      currentDate.value = createCalendar(currentDate.value.era, year.value, MIN_DATE.month, 1);
      return;
    }

    if (currentDate.value.month > MAX_DATE.month && year.value === MAX_DATE.year) {
      currentDate.value = createCalendar(currentDate.value.era, year.value, MAX_DATE.month, 1);
      return;
    }

    currentDate.value = createCalendar(currentDate.value.era, year.value, currentDate.value.month, 1);
  };

  const select = (date: CalendarCell) => {
    if (date.disabled) {
      return;
    }

    if (selected.value && isSameDay(selected.value, date.origin)) {
      selected.value = null;
      return;
    }

    selected.value = date.origin;

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
