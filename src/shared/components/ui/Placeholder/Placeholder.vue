<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface PlaceholderProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<PlaceholderProps>();
</script>

<template>
  <div :class="cn('relative w-full overflow-hidden rounded-sm border border-dashed border-black/20 text-black/10', props.class)">
    <svg class="absolute inset-0 h-full w-full" fill="none" stroke="currentColor">
      <defs>
        <pattern id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
        </pattern>
      </defs>
      <rect stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" width="100%" height="100%"></rect>
    </svg>
  </div>
</template>

<style lang="scss"></style>
