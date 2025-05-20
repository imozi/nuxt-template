// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  extends: ['./src/app', './src/core', './src/shared'],
  modules: ['@nuxtjs/stylelint-module', '@nuxt/eslint'],
  imports: {
    imports: [
      {
        from: 'class-variance-authority',
        name: 'cva',
      },
      {
        from: 'class-variance-authority',
        name: 'VariantProps',
        type: true,
      },
      {
        from: 'clsx',
        name: 'clsx',
      },
      {
        from: 'clsx',
        name: 'ClassValue',
        type: true,
      },
      {
        from: 'tailwind-merge',
        name: 'twMerge',
      },
    ],
  },
  devtools: { enabled: true },
  srcDir: './src',
  serverDir: './server',
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
});
