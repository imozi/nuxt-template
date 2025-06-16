<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface CalendarRootProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<CalendarRootProps>();
</script>

<template>
  <div :class="cn('calendar-header', props.class)">
    <slot />
  </div>
</template>

<style lang="scss"></style>
