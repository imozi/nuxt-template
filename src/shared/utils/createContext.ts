export const createContext = <T>(description: string) => {
  const key: InjectionKey<T> = Symbol(description);

  const provideValue = (value: T) => {
    provide(key, value);
    return value;
  };

  const injectValue = (): T => {
    const injected = inject(key);
    if (injected === undefined) {
      throw new Error(`[Injection] "${description}" is not provided`);
    }
    return injected;
  };

  return {
    provide: provideValue,
    inject: injectValue,
  };
};
