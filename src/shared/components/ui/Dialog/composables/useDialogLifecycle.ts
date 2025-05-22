import { useDialogContext } from '..';
import { useDialogStack } from './useDialogStack';

export const useDialogLifecycle = (rootRef: Ref<HTMLElement | null>) => {
  const { stack, actions, size } = useDialogStack();
  const open = useDialogContext();

  const onKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && open === stack.dialog.value.at(-1)) {
      open.value = false;
    }
  };

  const setStyles = () => {
    if (!rootRef.value) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollbarWidthRoot = rootRef.value.offsetWidth - rootRef.value.clientWidth;

    if (size.value > 1) {
      const lastIndent = stack.indent.value.at(-1) ?? 0;
      const rootIndent = parseFloat(getComputedStyle(rootRef.value).paddingRight ?? '0');
      const totalIndent = lastIndent + rootIndent;

      rootRef.value.setAttribute('style', `padding-right: ${totalIndent}px;`);
    } else {
      const indent = scrollbarWidth > 0 ? ` padding-right: ${scrollbarWidth}px;` : '';
      const style = 'overflow: hidden; pointer-events: none;' + indent;
      document.body.setAttribute('style', style);
    }

    actions.push({ indent: scrollbarWidthRoot });
  };

  onBeforeMount(() => {
    actions.push({ dialog: open });
  });

  onMounted(() => {
    setStyles();
    window.addEventListener('keydown', onKeydown);
  });

  onUnmounted(() => {
    actions.pop('indent');
    const popped = actions.pop('dialog');

    if (popped && isRef(popped)) {
      popped.value = false;
    }

    if (size.value === 0) {
      setTimeout(() => {
        document.body.removeAttribute('style');
      }, 200);
    }

    window.removeEventListener('keydown', onKeydown);
  });
};
