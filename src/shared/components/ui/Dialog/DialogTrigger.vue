<script setup lang="ts">
import { useDialogContext } from '.';

const open = useDialogContext();
const triggerRef = useTemplateRef('trigger');

const onChangeOpen = () => {
  open.value = !open.value;
  triggerRef.value?.$el.blur();
};
</script>

<template>
  <Button ref="trigger" @click.prevent="onChangeOpen">
    <slot>
      <span>Open</span>
    </slot>
  </Button>
</template>

<style lang="scss"></style>
