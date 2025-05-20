<script setup lang="ts">
import type { HTMLAttributes, ButtonHTMLAttributes } from 'vue';
import { type ButtonVariants, buttonVariants } from '.';

interface ButtonProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  type?: ButtonHTMLAttributes['type'];
}

const { variant, size, class: classNames, type = 'button' } = defineProps<ButtonProps>();
</script>

<template>
  <button :type="type" :class="cn(buttonVariants({ variant, size }), classNames)">
    <slot />
  </button>
</template>

<style lang="scss"></style>
