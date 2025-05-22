<script setup lang="ts">
import { provideDialogContext } from '.';

const open = defineModel<boolean>('open', { default: false, required: false });
provideDialogContext(open);
</script>

<template>
  <slot />
</template>

<style lang="scss"></style>
