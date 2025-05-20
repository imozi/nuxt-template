<script setup lang="ts">
import { DialogOpenKey } from '.';

const open = useInject(DialogOpenKey);
const triggerRef = useTemplateRef('trigger');

const onChangeOpen = () => {
  open.value = !open.value;
  triggerRef.value?.$el.blur();
  console.log(open.value);
};
</script>

<template>
  <Button ref="trigger" @click.prevent="onChangeOpen">
    <slot />
  </Button>
</template>

<style lang="scss"></style>
