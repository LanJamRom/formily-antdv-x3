import { connect, mapProps, mapReadPretty, h } from "@formily/vue";
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from "../__builtins__/shared";
import { PreviewText } from "../preview-text";
import { Radio as AntdRadio } from "ant-design-vue";
import type { RadioGroupProps as AntdRadioGroupProps } from "ant-design-vue";
import type { PropType } from "vue";
import { defineComponent } from "vue";

const { Button, Group } = AntdRadio;

export type RadioGroupProps = AntdRadioGroupProps & {
  optionType: "defalt" | "button";
};

const TransformRadioGroup = transformComponent(Group, {
  change: "input",
});

const RadioGroupOption = defineComponent({
  name: "RadioGroup",
  props: {
    options: {
      type: Array as PropType<RadioGroupProps["options"]>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps["optionType"]>,
      default: "default",
    },
  },
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || [];
      const OptionType =
        customProps.optionType === "button" ? Button : AntdRadio;
      const children = options.length
        ? {
            default: () =>
              options.map((option) => {
                if (typeof option !== "object") {
                  return h(
                    OptionType,
                    { props: { value: option } },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option, { option }),
                      ],
                    }
                  );
                } else {
                  return h(
                    OptionType,
                    {
                      props: {
                        ...option,
                        value: option.value,
                        label: option.label,
                      },
                    },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option.label, {
                          option,
                        }),
                      ],
                    }
                  );
                }
              }),
          }
        : slots;
      return h(
        TransformRadioGroup,
        {
          attrs: {
            ...attrs,
          },
          on: {
            ...attrs,
          },
        },
        children
      );
    };
  },
});

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: "options" }),
  mapReadPretty(PreviewText.Select)
);

export const Radio = composeExport(AntdRadio, {
  Group: RadioGroup,
}) as any;

export default Radio;
