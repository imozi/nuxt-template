<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarRootProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarRootProps>();
</script>

<template>
  <div :class="cn('calendar-root inline-flex flex-col gap-2 border p-2', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
