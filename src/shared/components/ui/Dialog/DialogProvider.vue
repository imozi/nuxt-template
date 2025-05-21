<script setup lang="ts">
import { DialogOpenKey } from '.';

const open = defineModel<boolean>('open', { default: false, required: false });
provide(DialogOpenKey, open);
</script>

<template>
  <slot />
</template>

<style lang="scss"></style>
