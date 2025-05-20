<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DialogOpenKey, dialogStore } from '.';

interface DialogContentProps {
  class?: HTMLAttributes['class'];
}

const open = useInject(DialogOpenKey);
const props = defineProps<DialogContentProps>();

const handleChangeOpen = (evt: KeyboardEvent) => {
  if (evt.key !== 'Escape') return;

  if (dialogStore.dialogStack[dialogStore.dialogStack.length - 1] !== open) return;

  const current = dialogStore.dialogStack.pop();

  if (!current) return;

  current.value = false;
  console.log(current === open);
};

onMounted(() => {
  dialogStore.dialogStack.push(open);
  window.addEventListener('keydown', handleChangeOpen);

  onUnmounted(() => {
    window.removeEventListener('keydown', handleChangeOpen);
  });
});
</script>

<template>
  <div :class="cn('top-1/2 left-1/2 z-50 m-auto rounded-md border border-black/20 bg-white p-5', props.class)" @mousedown.stop>
    <slot />
  </div>
</template>

<style lang="scss"></style>
