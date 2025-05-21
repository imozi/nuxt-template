<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface DialogContentProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<DialogContentProps>();
</script>

<template>
  <div :class="cn('relative m-auto grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-5 rounded-md bg-white p-6', props.class)" @mousedown.stop>
    <slot />
  </div>
</template>

<style lang="scss"></style>
