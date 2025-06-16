<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarGridBodyProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarGridBodyProps>();
</script>

<template>
  <div :class="cn('calendar-grid-body flex items-center', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
