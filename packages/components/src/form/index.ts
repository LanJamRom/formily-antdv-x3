/* eslint-disable vue/require-default-prop */
import type { Form as FormType, IFormFeedback } from '@formily/core'
import { FormProvider as _FormProvider, h, useForm } from '@formily/vue'
import { defineComponent } from 'vue'
import type { FormLayoutProps } from '../form-layout'
import { FormLayout } from '../form-layout'
import { PreviewText } from '../preview-text'
import type { PropType, Component, VNode } from 'vue'
import { propTypes } from '../__builtins__/shared/propTypes'

const FormProvider = _FormProvider as unknown as Component

export interface FormProps extends FormLayoutProps {
  form?: FormType
  component?: VNode
  previewTextPlaceholder?: string | (() => VNode)
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Form = defineComponent({
  props: {
    form: {
      type: Object as PropType<FormType>,
    },
    component: propTypes.string.def('component'),
    previewTextPlaceholder: propTypes
      .oneOfType([propTypes.string, propTypes.func])
      .def('NaN'),
    onAutoSubmit: {
      type: Function as PropType<(values: any) => any>,
    },
    onAutoSubmitFailed: {
      type: Function as PropType<(feedbacks: IFormFeedback) => void>,
    },
  },
  setup(props, { attrs, slots }) {
    const top = useForm()
    return () => {
      const {
        form,
        component = 'form',
        onAutoSubmit = attrs?.autoSubmit,
        onAutoSubmitFailed = attrs?.autoSubmitFailed,
        previewTextPlaceholder = slots?.previewTextPlaceholder,
      } = props

      const renderContent = (form: FormType) => {
        return h(
          PreviewText.Placeholder,
          {
            value: previewTextPlaceholder,
          },
          {
            default: () => [
              h(FormLayout, attrs, {
                default: () => [
                  h(
                    component,
                    {
                      submit: (e: Event) => {
                        e?.stopPropagation?.()
                        e?.preventDefault?.()
                        form
                          .submit(onAutoSubmit as (e: any) => void)
                          .catch(onAutoSubmitFailed as (e: any) => void)
                      },
                    },
                    slots
                  ),
                ],
              }),
            ],
          }
        )
      }
      if (form) {
        return h(
          FormProvider,
          { form },
          {
            default: () => renderContent(form),
          }
        )
      }

      if (!top.value) throw new Error('must pass form instance by createForm')

      return renderContent(top.value)
    }
  },
})

export default Form
