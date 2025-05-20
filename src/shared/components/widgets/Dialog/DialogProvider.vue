<script setup lang="ts">
import { useDialogState } from '.';

const open = defineModel<boolean>('open', { default: false, required: false });

const { action } = useDialogState();
action.initState(open);
</script>

<template>
  <slot />
</template>

<style lang="scss"></style>
