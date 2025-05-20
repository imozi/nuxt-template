import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('inline-flex cursor-pointer', {
  variants: {
    variant: {
      default: '',
      second: '',
      icon: '',
    },
    size: {
      default: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
