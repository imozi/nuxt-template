const dialogStack = ref<Ref<boolean>[]>([]);
const dialogIndentStack = ref<number[]>([]);

export const useDialogStack = () => {
  const size = computed(() => dialogStack.value.length);

  const actions = {
    push: ({ dialog, indent }: { dialog?: Ref<boolean>; indent?: number }) => {
      if (dialog !== undefined) {
        dialogStack.value.push(dialog);
      }

      if (indent !== undefined) {
        dialogIndentStack.value.push(indent);
      }
    },
    pop: (stack: 'dialog' | 'indent') => {
      if (stack === 'dialog') {
        return dialogStack.value.pop() ?? null;
      }

      if (stack === 'indent') {
        return dialogIndentStack.value.pop() ?? null;
      }

      return null;
    },
    reset: () => {
      dialogStack.value = [];
      dialogIndentStack.value = [];
    },
  };

  return {
    stack: {
      dialog: readonly(dialogStack),
      indent: readonly(dialogIndentStack),
    },
    size,
    actions,
  };
};
