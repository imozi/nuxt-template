<script setup lang="ts">
import { DialogOpenKey } from '.';

const open = useInject(DialogOpenKey);
const closeRef = useTemplateRef('close');

const onChangeOpen = () => {
  if (!open.value) return;

  open.value = !open.value;
  closeRef.value?.$el.blur();
};
</script>

<template>
  <Button ref="close" @click="onChangeOpen">
    <slot>Close</slot>
  </Button>
</template>

<style lang="scss"></style>
