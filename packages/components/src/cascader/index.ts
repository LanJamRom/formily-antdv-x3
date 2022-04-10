import { connect, mapProps, mapReadPretty, h } from "@formily/vue";
import { Cascader as AntdCascader } from "ant-design-vue";
import { PreviewText } from "../preview-text";
import Icon from "@ant-design/icons-vue";
export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: "options",
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.["loading"] || field?.["validating"]
            ? h(Icon, { props: { type: "loading" } }, {})
            : props.suffixIcon,
      };
    }
  ),
  mapReadPretty(PreviewText.Cascader)
) as any;

export default Cascader;
