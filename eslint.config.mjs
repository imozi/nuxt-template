// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config';

export default createConfigForNuxt(
  {
    features: {
      stylistic: {
        semi: true,
        quotes: 'single',
        quoteProps: 'consistent',
        braceStyle: '1tbs',
      },
    },
  },
  {
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 6,
          },
          multiline: {
            max: 6,
          },
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'vue/html-self-closing': 'off',
    },
  },
);
