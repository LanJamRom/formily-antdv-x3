import { connect, mapProps } from "@formily/vue";
import { Switch as AntdSwitch } from "ant-design-vue";
export const Switch = connect(
  AntdSwitch,
  mapProps({ value: "checked", readOnly: "readonly" })
) as any;

export default Switch;
