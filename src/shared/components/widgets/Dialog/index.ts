import type { ModelRef } from 'vue';

interface DialogStore {
  count: number;
  bodyStyleStack: string[];
  dialogStack: Ref<boolean>[];
  scrollbarWidth: number;
}
export const DialogOpenKey: InjectionKey<ModelRef<boolean>> = Symbol('dialog-open');

const store = reactive<DialogStore>({
  count: 0,
  bodyStyleStack: [],
  dialogStack: [],
  scrollbarWidth: 0,
});

export const useDialogState = () => {
  // const openDialog = useInject(DialogOpenKey);

  const action = {
    initState: (open: Ref<boolean>) => {
      useProvide(DialogOpenKey, open);
    },
    updateCount: createUpdater(store, 'count'),
    updateBodyStyleStack: createUpdater(store, 'bodyStyleStack'),
    updateDialogStack: createUpdater(store, 'dialogStack'),
    updateScrollbarWidth: createUpdater(store, 'scrollbarWidth'),
  };

  return {
    state: readonly(store),
    // open: openDialog,
    action,
  };
};
