export const createUpdater = <T extends object, K extends keyof T>(target: T, key: K, transform?: (value: T[K]) => T[K]) => {
  return (newValue: T[K]) => {
    target[key] = transform ? transform(newValue) : newValue;
  };
};
