import { InjectionKey, Ref } from "vue";
import {
  provide,
  inject,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";
import { h } from "@formily/vue";
import { stylePrefix } from "../__builtins__/configs";
import { useResponsiveFormLayout } from "./useResponsiveFormLayout";
import { propTypes } from "../__builtins__/shared/propTypes";

export type FormLayoutProps = {
  className?: string;
  colon?: boolean;
  labelAlign?: "right" | "left" | ("right" | "left")[];
  wrapperAlign?: "right" | "left" | ("right" | "left")[];
  labelWrap?: boolean;
  labelWidth?: number;
  wrapperWidth?: number;
  wrapperWrap?: boolean;
  labelCol?: number | number[];
  wrapperCol?: number | number[];
  fullness?: boolean;
  size?: "small" | "default" | "large";
  layout?:
    | "vertical"
    | "horizontal"
    | "inline"
    | ("vertical" | "horizontal" | "inline")[];
  direction?: "rtl" | "ltr";
  shallow?: boolean;
  feedbackLayout?: "loose" | "terse" | "popover";
  tooltipLayout?: "icon" | "text";
  bordered?: boolean;
  inset?: boolean;
  spaceGap?: number;
  gridColumnGap?: number;
  gridRowGap?: number;
};

export const FormLayoutDeepContext: InjectionKey<Ref<FormLayoutProps>> = Symbol(
  "FormLayoutDeepContext"
);

export const FormLayoutShallowContext: InjectionKey<Ref<FormLayoutProps>> =
  Symbol("FormLayoutShallowContext");

export const useFormDeepLayout = (): Ref<FormLayoutProps> =>
  inject(FormLayoutDeepContext, ref({}));

export const useFormShallowLayout = (): Ref<FormLayoutProps> =>
  inject(FormLayoutShallowContext, ref({}));

export const useFormLayout = (): Ref<FormLayoutProps> => {
  const shallowLayout = useFormShallowLayout();
  const deepLayout = useFormDeepLayout();
  const formLayout = ref({
    ...deepLayout.value,
    ...shallowLayout.value,
  });

  watch(
    [shallowLayout, deepLayout],
    () => {
      formLayout.value = {
        ...deepLayout.value,
        ...shallowLayout.value,
      };
    },
    {
      deep: true,
    }
  );
  return formLayout;
};

export const FormLayout = defineComponent({
  name: "FFormLayout",
  props: {
    className: propTypes.string,
    colon: propTypes.bool.def(true),
    labelAlign: propTypes.oneOfType<"right" | "left" | ("right" | "left")[]>([
      "left",
      "right",
      propTypes.arrayOf(propTypes.oneOf(["right", "left"])),
    ]),
    wrapperAlign: propTypes.oneOfType<"right" | "left" | ("right" | "left")[]>([
      "left",
      "right",
      propTypes.arrayOf(propTypes.oneOf(["right", "left"])),
    ]),
    labelWrap: propTypes.bool.def(false),
    labelWidth: propTypes.number,
    wrapperWidth: propTypes.number,
    wrapperWrap: propTypes.bool.def(false),
    labelCol: propTypes.number,
    wrapperCol: propTypes.number,
    fullness: propTypes.bool.def(false),
    size: propTypes.oneOf(["small", "default", "middle"]).def("default"),
    layout: propTypes
      .oneOfType<
        | "vertical"
        | "horizontal"
        | "inline"
        | ("vertical" | "horizontal" | "inline")[]
      >([
        "vertical",
        "horizontal",
        "inline",
        propTypes.arrayOf(
          propTypes.oneOf(["vertical", "horizontal", "inline"])
        ),
      ])
      .def("horizontal"),
    direction: propTypes.oneOf(["rtl", "ltr"]).def("ltr"),
    shallow: propTypes.bool.def(true),
    feedbackLayout: propTypes.oneOf(["loose", "terse", "popover"]),
    tooltipLayout: propTypes.oneOf(["icon", "text"]),
    bordered: propTypes.bool.def(true),
    inset: propTypes.bool.def(false),
    spaceGap: propTypes.number.def(8),
    gridColumnGap: propTypes.number.def(8),
    gridRowGap: propTypes.number.def(4),
  },
  setup(customProps, { slots }) {
    const ctx = getCurrentInstance();
    const { props } = useResponsiveFormLayout(customProps, ctx?.refs);
    const deepLayout = useFormDeepLayout();
    const newDeepLayout = ref({
      ...deepLayout.value,
    });

    const shallowProps = ref({});

    watch(
      [props, deepLayout],
      () => {
        shallowProps.value = props.value.shallow ? props.value : undefined;
        if (!props.value.shallow) {
          Object.assign(newDeepLayout.value, props.value);
        } else {
          if (props.value.size) {
            newDeepLayout.value.size = props.value.size;
          }

          if (props.value.colon) {
            newDeepLayout.value.colon = props.value.colon;
          }
        }
      },
      { deep: true, immediate: true }
    );

    provide(FormLayoutDeepContext, newDeepLayout);
    provide(FormLayoutShallowContext, shallowProps);

    const formPrefixCls = `${stylePrefix}-form`;
    return () => {
      const classNames = {
        [`${formPrefixCls}-${props.value.layout}`]: true,
        [`${formPrefixCls}-rtl`]: props.value.direction === "rtl",
        [`${formPrefixCls}-${props.value.size}`]:
          props.value.size !== undefined,
        [`${props.value.className}`]: props.value.className !== undefined,
      };
      return h(
        "div",
        {
          ref: "root",
          class: classNames,
        },
        slots
      );
    };
  },
});

export default FormLayout;
