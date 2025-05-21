<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DialogOpenKey } from '.';

interface PlaceholderProps {
  class?: HTMLAttributes['class'];
}

const open = useInject(DialogOpenKey);
const props = defineProps<PlaceholderProps>();
</script>

<template>
  <Transition name="dialog-overlay">
    <div v-if="open" :class="cn('fixed inset-0 z-50 bg-black/80', props.class)"></div>
  </Transition>
</template>

<style lang="scss">
.dialog-overlay-enter-active,
.dialog-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.dialog-overlay-enter-from,
.dialog-overlay-leave-to {
  opacity: 0;
}

.dialog-overlay-enter-to,
.dialog-overlay-leave-from {
  opacity: 1;
}
</style>
