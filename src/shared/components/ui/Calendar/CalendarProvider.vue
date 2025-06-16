<script setup lang="ts">
import { useCreateCalendar } from './composables/useCreateCalendar';
import { provideCalendarContext } from '.';

interface CalendarProps {
  locale?: 'ru-RU' | 'en-US';
  minDate?: string;
  maxDate?: string;
}

const date = defineModel<string>('date', { default: '', required: false });
const props = defineProps<CalendarProps>();

const calendar = useCreateCalendar({
  locale: props.locale,
  minDate: props.minDate,
  maxDate: props.maxDate,
  defaultValue: date.value,
});

provideCalendarContext(calendar);

watch(calendar.selected, () => {
  date.value = calendar.selected.value?.toString() ?? '';
});
</script>

<template>
  <slot />
</template>

<style lang="scss"></style>
