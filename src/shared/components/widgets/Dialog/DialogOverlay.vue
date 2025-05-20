<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DialogOpenKey, dialogStore } from '.';

interface DialogOverlayProps {
  class?: HTMLAttributes['class'];
}

const open = useInject(DialogOpenKey);
const props = defineProps<DialogOverlayProps>();
const overlayRef = useTemplateRef('overlayRef');

watch(overlayRef, () => {
  if (!dialogStore.count) return;
  if (!overlayRef.value) return;

  const scrollWidth = window.innerWidth - overlayRef.value.clientWidth;

  overlayRef.value.style.paddingLeft = `${scrollWidth}px`;
});
</script>

<template>
  <div
    v-if="open"
    ref="overlayRef"
    :class="cn('fixed inset-0 top-0 left-0 flex items-center justify-center overflow-y-auto bg-black/80 p-5', props.class)"
  >
    <slot />
  </div>
</template>

<style lang="scss"></style>
