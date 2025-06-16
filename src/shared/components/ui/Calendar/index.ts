import type { useCreateCalendar } from './composables/useCreateCalendar';

export const { provide: provideCalendarContext, inject: useCalendarContext } =
  createContext<ReturnType<typeof useCreateCalendar>>('calendar-context');
