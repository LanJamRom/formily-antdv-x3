/* eslint-disable vue/require-default-prop */
import { h, useParentForm } from '@formily/vue'
import type { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { defineComponent, PropType } from 'vue'

import { Button as AntButton } from 'ant-design-vue'

export const Submit = observer(
  defineComponent({
    props: {
      onClick: { type: Function as PropType<(event: MouseEvent) => void> },
      onSubmit: {
        type: Function as PropType<(values: Record<string, any>) => void>,
      },
      onSubmitSuccess: { type: Function as PropType<(payload: any) => void> },
      onSubmitFailed: {
        type: Function as PropType<(feedbacks: IFormFeedback[]) => void>,
      },
    },
    setup(props, { attrs, slots }: any) {
      const formRef = useParentForm()
      return () => {
        const {
          onClick = attrs?.onClick,
          onSubmit = attrs?.onSubmit,
          onSubmitSuccess = attrs?.onSubmitSuccess,
          onSubmitFailed = attrs?.onSubmitFailed,
        } = props

        const form = formRef?.value
        return h(
          AntButton,
          {
            nativeType: attrs?.submit ? 'button' : 'submit',
            type: 'primary',
            ...attrs,
            loading:
              attrs.loading !== undefined ? attrs.loading : form?.submitting,
            onClick: (e: any) => {
              if (onClick) {
                if (onClick(e) === false) return
              }
              if (onSubmit) {
                form
                  ?.submit(onSubmit as (e: any) => void)
                  .then(onSubmitSuccess as (e: any) => void)
                  .catch(onSubmitFailed as (e: any) => void)
              }
            },
          },
          slots
        )
      }
    },
  })
)

export default Submit
