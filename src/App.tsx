import { defineComponent } from "vue";
import ACButton from "./button/ACButton";
let a = 1;
console.log(a);
export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <div>
          <ACButton class={`ml-3`} color="blue">
            蓝色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="green">
            绿色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="gray">
            灰色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="yellow">
            黄色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="red">
            红色按钮
          </ACButton>
        </div>
        <div class={`mt-3`}>
          <ACButton class={`ml-3`} color="blue" plain={true}>
            蓝色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="green" plain={true}>
            绿色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="gray" plain={true}>
            灰色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="yellow" plain={true}>
            黄色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="red" plain={true}>
            红色按钮
          </ACButton>
        </div>
        <div class={`mt-3`}>
          <ACButton class={`ml-3`} color="blue" plain={true} round={true}>
            蓝色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="green" plain={true} round={true}>
            绿色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="gray" plain={true} round={true}>
            灰色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="yellow" plain={true} round={true}>
            黄色按钮
          </ACButton>
          <ACButton class={`ml-3`} color="red" plain={true} round={true}>
            红色按钮
          </ACButton>
        </div>
      </div>
    );
  },
});
