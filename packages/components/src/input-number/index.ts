import { connect, mapReadPretty, VueComponent } from '@formily/vue'
import { InputNumber as AntdInputNumber } from 'ant-design-vue'
import { PreviewText } from '../preview-text'

export const InputNumber = connect(AntdInputNumber, mapReadPretty(PreviewText.Input)) as VueComponent

export default InputNumber
