import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('transition-color inline-flex cursor-pointer duration-300', {
  variants: {
    variant: {
      default: '',
      second: '',
      icon: 'items-center justify-center rounded-sm p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    },
    size: {
      default: '',
    },
    icon: {
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
