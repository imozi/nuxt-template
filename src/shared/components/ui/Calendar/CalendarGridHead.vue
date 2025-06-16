<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarGridHeadProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarGridHeadProps>();
</script>

<template>
  <div :class="cn('calendar-grid-head flex items-center', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
