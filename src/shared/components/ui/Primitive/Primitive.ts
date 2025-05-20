export type AsTag = 'a' | 'button' | 'div' | 'input' | 'label' | 'li' | 'nav' | 'ol' | 'ul' | ({} & string);

export interface PrimitiveProps {
  as?: AsTag;
}

export const Primitive = defineComponent({
  name: 'Primitive',
  inheritAttrs: false,
  props: {
    as: {
      type: [String, Object] as PropType<AsTag | Component>,
      default: 'div',
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.as;

    return () => h(asTag, attrs, { default: slots.default });
  },
});
