import { App } from "vue";
import { Button } from "./button";
import { Input } from "./input";
import { Popper } from "./popper";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";
import "uno.css";

// 导出单独组件
export { Button, Input, Popper, SFCButton, JSXButton };

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(Button.name, Button);
    app.component(Input.name, Input);
    app.component(Popper.name, Popper);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
