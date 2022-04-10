import { connect, mapProps, mapReadPretty, VueComponent } from '@formily/vue'
import { DatePicker as AntdDatePicker } from 'ant-design-vue'
import type { DatePickerProps as AntdDatePickerProps } from 'ant-design-vue'
import { formatMomentValue, composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'

const mapDateFormat = function () {
  const getDefaultFormat = (props: AntdDatePickerProps) => {
    if (props['mode'] === 'month') {
      return 'YYYY-MM'
    } else if (props['mode'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['mode'] === 'year') {
      return 'YYYY'
    } else if (props['mode'] === 'week') {
      return 'gggg-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format: format,
      valueFormat: props.valueFormat || getDefaultFormat(props),
      on: {
        change: (value: moment.Moment | moment.Moment[]) => {
          if (onChange) {
            onChange(formatMomentValue(value, format))
          }
        }
      }
    }
  }
}

export const _DatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
) as VueComponent

export const _RangePicker = connect(
  AntdDatePicker.RangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DateRangePicker)
) as VueComponent

export const _WeekPicker = connect(AntdDatePicker.WeekPicker) as VueComponent

export const _MonthPicker = connect(AntdDatePicker.MonthPicker) as VueComponent

export const DatePicker = composeExport(_DatePicker, {
  RangePicker: _RangePicker,
  WeekPicker: _WeekPicker,
  MonthPicker: _MonthPicker
})

export default DatePicker
