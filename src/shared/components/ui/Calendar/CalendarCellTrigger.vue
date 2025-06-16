<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { CalendarCell } from './types';

interface CalendarCellTriggerProps {
  item: CalendarCell;
  select: (date: CalendarCell) => void;
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarCellTriggerProps>();

const computedClass = computed(() => {
  return {
    'text-muted': props.item.position !== 'current',
    'text-': props.item.position === 'current',
    'text-red-500': props.item.weekend,
    'bg-accent': props.item.today,
    'bg-primary text-white': props.item.selected,
    'text-slate-200': props.item.disabled,
  };
});
</script>

<template>
  <button
    :class="
      cn('calendar-cell-trigger h-full w-full rounded-md transition-colors duration-300', props.class, computedClass)
    "
    @click="props.select(item)"
  >
    {{ item.day }}
  </button>
</template>

<style lang="scss"></style>
