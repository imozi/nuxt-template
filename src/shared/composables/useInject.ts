export const useInject = <T>(key: InjectionKey<T>) => {
  const value = inject(key);
  if (value === undefined) {
    throw new Error(`[useInject]: ${String(key)} is not provided`);
  }
  return value;
};
