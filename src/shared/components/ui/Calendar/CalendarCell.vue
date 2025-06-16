<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useCalendarContext } from '.';

interface CalendarCellProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarCellProps>();

const { days, actions } = useCalendarContext();
</script>

<template>
  <div
    v-for="item of days"
    :key="item.origin.toString()"
    :class="cn('calendar-cell flex h-8 w-8 items-center justify-center', props.class)"
  >
    <slot :cell="item" :select="actions.select" />
  </div>
</template>

<style lang="scss"></style>
