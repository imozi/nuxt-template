<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarGridProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarGridProps>();
</script>

<template>
  <div :class="cn('calendar-grid flex flex-col justify-center gap-2', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
