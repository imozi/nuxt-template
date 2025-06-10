<script setup lang="ts">
type CalendarProps = {
  minDate?: string;
  maxDate?: string;
  mode?: 'single' | 'multiple' | 'range';
};

const { mode = 'single', ...props } = defineProps<CalendarProps>();

const Calendar =
  mode === 'single'
    ? resolveComponent('CalendarSingle')
    : mode === 'multiple'
      ? resolveComponent('CalendarMultiple')
      : resolveComponent('CalendarRange');
</script>

<template>
  <component :is="Calendar" v-bind="props"></component>
</template>

<style></style>
