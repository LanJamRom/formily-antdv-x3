import { Component, CSSProperties, VNodeChild } from 'vue'
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types'

export type VueNode = VNodeChild | JSX.Element | Component

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VNodeChild: VueTypeValidableDef<VueNode>
  // readonly trueBool: VueTypeValidableDef<boolean>;
}

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}).extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: null
  }
]) as PropTypes

export { propTypes }
