<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useDialogLifecycle } from './composables/useDialogLifecycle';
import { useDialogContext } from '.';

interface DialogRootProps {
  class?: HTMLAttributes['class'];
}

const open = useDialogContext();
const props = defineProps<DialogRootProps>();
const rootRef = useTemplateRef('rootRef');

useDialogLifecycle(rootRef);

const onMousedown = (evt: MouseEvent) => {
  if (evt.button !== 0 || !open.value) return;
  open.value = !open.value;
};
</script>

<template>
  <div
    ref="rootRef"
    :class="cn('pointer-events-auto fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-5', props.class)"
    @mousedown.stop="onMousedown"
  >
    <slot />
  </div>
</template>

<style lang="scss"></style>
