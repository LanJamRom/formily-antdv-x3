import type { Component } from 'vue'
import { merge } from '@formily/shared'
import { h } from '@formily/vue'
import { defineComponent } from 'vue'

type ListenersTransformRules = Record<string, string>

export const transformComponent = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> | any =>
  defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        let data = {
          ...attrs
        }
        if (transformRules) {
          const listeners = transformRules
          Object.keys(listeners).forEach(extract => {
            const event = listeners[extract]
            data[`on${event[0].toUpperCase()}${event.slice(1)}`] =
              attrs[`on${extract[0].toUpperCase()}${extract.slice(1)}`]
          })
        }
        if (defaultProps) {
          data = merge(defaultProps, data)
        }
        return h(tag, data, slots)
      }
    }
  })
