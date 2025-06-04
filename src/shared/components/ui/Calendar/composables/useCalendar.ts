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

interface CalendarCell {
  day: number;
  position: PositionCell;
  weekend: boolean;
  today: boolean;
  selected: boolean;
  disabled: boolean;
  origin: CalendarDate;
}

const LOCALE = 'ru-RU';
const WEEK_DAYS = 7;
const MONTH = 12;
const GAP_YEAR = 12;
const BASE_DATE = new CalendarDate(1990, 1, 1);

const formatter = (options: Intl.DateTimeFormatOptions) => {
  return new DateFormatter(LOCALE, options);
};

const toNativeDate = (date: CalendarDate) => new Date(date.toString());

const isSameMonth = (a: CalendarDate, b: CalendarDate) => a.year === b.year && a.month === b.month;

const isBefore = (a: CalendarDate, b: CalendarDate) => a.compare(b) < 0;
const isAfter = (a: CalendarDate, b: CalendarDate) => a.compare(b) > 0;
const isSameDay = (a: CalendarDate, b: CalendarDate) => a.compare(b) === 0;

export const useCalendar = () => {
  const today = now(getLocalTimeZone());

  const MIN_DATE = new CalendarDate(1900, 1, 1);
  const MAX_DATE = new CalendarDate(today.era, today.year + GAP_YEAR, 12, 31);

  const selected = shallowRef<CalendarDate | null>(null);

  const currentDate = shallowRef(new CalendarDate(today.era, today.year, today.month, today.day));
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
    const df = formatter({ month: 'long' });

    return Array.from({ length: MONTH }, (_, i) => {
      const date = BASE_DATE.add({ months: i });

      return {
        value: date.month,
        label: df.format(toNativeDate(date)),
        selected: currentMonth.value === date.month,
      };
    });
  });

  const days: ComputedRef<CalendarCell[]> = computed(() => {
    return Array.from({ length: totalCells }, (_, i) => {
      const day = calendarStart.value.add({ days: i });
      const isCurrentMonth = isSameMonth(day, currentDate.value);
      const position = isCurrentMonth ? 'current' : isBefore(day, currentDate.value) ? 'prev' : 'next';
      const dayOfWeek = getDayOfWeek(day, LOCALE);

      const weekend = dayOfWeek === 5 || dayOfWeek === 6;

      return {
        day: day.day,
        position,
        weekend,
        today: isSameDay(today, day),
        selected: selected.value ? isSameDay(selected.value, day) : false,
        disabled: isBefore(day, MIN_DATE) || isAfter(day, MAX_DATE),
        origin: day,
      };
    });
  });

  const daysWeek = (() => {
    const df = formatter({ weekday: 'short' });

    return Array.from({ length: WEEK_DAYS }, (_, i) => {
      const day = BASE_DATE.add({ days: i });

      return df.format(toNativeDate(day));
    });
  })();

  const isPrev = computed(() => {
    const minYear = MIN_DATE.year;
    const minMonth = MIN_DATE.month;
    const year = currentYear.value;
    const month = currentMonth.value;

    return year > minYear || (year === minYear && month > minMonth);
  });

  const isNext = computed(() => {
    const maxYear = MAX_DATE.year;
    const maxMonth = MAX_DATE.month;
    const year = currentYear.value;
    const month = currentMonth.value;

    return year < maxYear || (year === maxYear && month < maxMonth);
  });

  const nextMonth = () => {
    if (!isNext.value) {
      return;
    }

    currentDate.value = currentDate.value.add({ months: 1 });
  };

  const prevMonth = () => {
    if (!isPrev.value) {
      return;
    }

    currentDate.value = currentDate.value.subtract({ months: 1 });
  };

  const setMonth = (month: (typeof months.value)[number]) => {
    currentDate.value = new CalendarDate(currentDate.value.era, currentDate.value.year, month.value, 1);
  };

  const setYear = (year: (typeof years.value)[number]) => {
    currentDate.value = new CalendarDate(currentDate.value.era, year.value, currentDate.value.month, 1);
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
    isPrev,
    isNext,
    actions: {
      nextMonth,
      prevMonth,
      setMonth,
      setYear,
      select,
    },
  };
};
