import { App } from "vue";
import { Button } from "./button";
import { Input } from "./input";
import { Popover } from "./popover";
import { Tooltips } from "./tooltips";
import { Date } from "./date";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";
import "uno.css";

// 导出单独组件
export { Button, Input, Popover, Tooltips, SFCButton, JSXButton };

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(Button.name, Button);
    app.component(Input.name, Input);
    app.component(Popover.name, Popover);
    app.component(Tooltips.name, Tooltips);
    app.component(Date.name, Date);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
