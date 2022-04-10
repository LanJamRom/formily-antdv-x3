import { h, useParentForm } from "@formily/vue";
import { observer } from "@formily/reactive-vue";
import { defineComponent } from "vue";

import { Button as AntButton } from "ant-design-vue";
import { propTypes } from "../__builtins__/shared/propTypes";

export const Reset = observer(
  defineComponent({
    props: {
      forceClear: propTypes.bool.def(false),
      validate: propTypes.bool.def(false),
    },
    setup(props, { attrs, slots }: any) {
      const formRef = useParentForm();
      return () => {
        const form = formRef?.value;
        return h(
          AntButton,
          {
            ...attrs,
            onClick: (e: MouseEvent) => {
              if (attrs?.click) {
                if (attrs.click(e) === false) return;
              }
              form
                ?.reset("*", {
                  forceClear: props.forceClear,
                  validate: props.validate,
                })
                .then(attrs.resetValidateSuccess as (e: any) => void)
                .catch(attrs.resetValidateFailed as (e: any) => void);
            },
          },
          slots
        );
      };
    },
  })
);

export default Reset;
