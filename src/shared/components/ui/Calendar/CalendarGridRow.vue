<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarGridRowProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarGridRowProps>();
</script>

<template>
  <div :class="cn('calendar-grid-row grid grow grid-cols-7', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
