<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DialogOpenKey } from '.';

interface DialogRootProps {
  class?: HTMLAttributes['class'];
}

const open = useInject(DialogOpenKey);
const props = defineProps<DialogRootProps>();

const onChangeOpen = (evt: MouseEvent) => {
  if (evt.button !== 0 || !open.value) return;
  open.value = !open.value;
};
</script>

<template>
  <Teleport to="#teleport" defer>
    <Transition name="dialog">
      <div v-if="open" :class="cn('pointer-events-auto fixed inset-0 z-50 p-5', props.class)" @mousedown.stop="onChangeOpen">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
