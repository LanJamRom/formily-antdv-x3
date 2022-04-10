import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { TimePicker as AntdTimePicker } from 'ant-design-vue'
import type { TimePickerProps } from 'ant-design-vue'
import { PreviewText } from '../preview-text'
import { transformComponent } from '../__builtins__'

const TransformElTimePicker = transformComponent<TimePickerProps>(
  AntdTimePicker,
  {
    change: 'input',
  }
)

export const TimePicker = connect(
  TransformElTimePicker,
  mapProps({ readOnly: 'read-only' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
