<script setup lang="ts">
import { useDialogContext } from '.';

const open = useDialogContext();
const closeRef = useTemplateRef('close');

const onChangeOpen = () => {
  if (!open.value) return;

  open.value = !open.value;
  closeRef.value?.$el.blur();
};
</script>

<template>
  <Button ref="close" class="absolute top-2 right-2 z-50" variant="icon" icon="sm" @click="onChangeOpen">
    <slot>
      <Icon name="solar:close-square-bold" class="size-full" />
    </slot>
  </Button>
</template>

<style lang="scss"></style>
