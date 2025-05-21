<script setup lang="ts">
interface DialogHeaderProps {
  withClose?: boolean;
}

const { withClose } = defineProps<DialogHeaderProps>();
</script>

<template>
  <div class="relative flex items-center">
    <div class="grow">
      <slot />
    </div>
    <div v-if="withClose" class="absolute -top-3 right-0">
      <DialogClose>X</DialogClose>
    </div>
  </div>
</template>

<style lang="scss"></style>
