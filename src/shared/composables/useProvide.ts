import type { InjectionKey } from 'vue';

export const useProvide = <T>(key: InjectionKey<T>, value: T) => {
  provide(key, value);

  return value;
};
