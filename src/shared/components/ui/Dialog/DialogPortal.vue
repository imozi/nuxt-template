<script setup lang="ts">
import type { TeleportProps } from 'vue';
import { useDialogContext } from '.';

interface DialogTeleportProps extends Omit<TeleportProps, 'to'> {
  to?: TeleportProps['to'];
}

const { to = '#teleport', ...props } = defineProps<DialogTeleportProps>();

const open = useDialogContext();
</script>

<template>
  <Teleport :to="to" v-bind="props">
    <Transition name="dialog">
      <slot v-if="open" />
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.dialog-enter-active,
.dialog-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

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
