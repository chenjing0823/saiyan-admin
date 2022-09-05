import { defineComponent, onMounted, ref, onBeforeUnmount, watch } from "vue";

import "./popper.css";
// import "uno.css";

export const props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String,
    default: "click",
    validator: (value) => ["click", "hover", "manual"].indexOf(value) > -1,
  },
  placement: {
    type: String,
    default: "top",
  },
  title: {
    type: String,
    default: "标题",
  },
  content: {
    type: String,
    default: "这里是内容",
  },
} as const;

export default defineComponent({
  name: "SPopover",
  emits: [],
  props,
  setup(props, ctx) {
    const visible = ref(false);
    const { slots } = ctx;

    const position = ref("");

    onMounted(() => {
      if (props.trigger === "click") {
        document.addEventListener("click", handleClick);
      } else if (props.trigger === "manual") {
        watch(
          () => props.modelValue,
          (val) => {
            visible.value = val;
          }
        );
      }
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClick);
    });
    const handleClick = () => {
      visible.value = false;
    };

    const getPoint = (obj) => {
      //获取某元素以浏览器左上角为原点的坐标
      var t = obj.offsetTop; //获取该元素对应父容器的上边距
      var l = obj.offsetLeft; //对应父容器的上边距
      //判断是否有父容器，如果存在则累加其边距
      while ((obj = obj.offsetParent)) {
        //等效 obj = obj.offsetParent;while (obj != undefined)
        t += obj.offsetTop; //叠加父容器的上边距
        l += obj.offsetLeft; //叠加父容器的左边距
      }
      return {
        top: t,
        left: l,
      };
    };

    const getSizeAttr = (elementSelector, attrName) => {
      // 获取display:none元素的宽高
      let oDiv = document.querySelector(elementSelector);
      oDiv.style.cssText = `visibility:hidden`;
      let attr = {
        height: oDiv.offsetHeight,
        width: oDiv.offsetWidth,
        offsetLeft: oDiv.offsetLeft,
        offsetTop: oDiv.offsetTop,
      };
      oDiv.style.cssText = `display:none`;
      return attr[attrName];
    };

    const heightWidth = (event: Event) => {
      const width = (event.currentTarget as HTMLElement).offsetWidth;
      const height = (event.currentTarget as HTMLElement).offsetHeight;
      // console.log(width, height);
      // const domrect = (
      //   event.currentTarget as HTMLElement
      // ).getBoundingClientRect(); // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置
      const domrect = getPoint(event.currentTarget as HTMLElement);
      const bodyheight = getSizeAttr(".s-popper__body", "height");
      const bodywidth = getSizeAttr(".s-popper__body", "width");
      const { placement } = props;
      if (placement === "top") {
        position.value = `top:${domrect.top - bodyheight}px;left:${
          domrect.left
        }px`;
        console.log(position.value);
      } else if (placement === "right") {
        let right = domrect.left + width; // 点击元素距离body左边的距离 - 弹出框的宽度
        position.value = `left: ${right}px;top: ${domrect.top}px;`;
      } else if (placement === "bottom") {
        position.value = `top: ${domrect.top + height}px;left:${
          domrect.left
        }px`;
      } else if (placement === "left") {
        let left = domrect.left - bodywidth; // 点击元素距离body左边的距离 - 弹出框的宽度
        if (left < 0) {
          left = domrect.left + width;
        }
        position.value = `left: ${left}px;top: ${domrect.top}px;`;
      }
    };
    const onPopperMouseEnter = (event: Event) => {
      if (props.trigger !== "hover") return;
      heightWidth(event);
      visible.value = true;
    };
    const onPopperMouseleave = () => {
      if (props.trigger !== "hover") return;
      visible.value = false;
    };
    const onPopperClick = (event: Event) => {
      if (props.trigger === "click") {
        visible.value = !visible.value;
        heightWidth(event);
        event.stopPropagation();
      } else if (props.trigger === "manual") {
        heightWidth(event);
      }
    };

    // console.log(`html`, document.querySelector(`#app`)?.innerHTML);

    return () => (
      <div ref="poppver">
        <s-tooltips>
          <div
            v-show={visible.value}
            class={`
              s-popper__body`}
            style={`${position.value}`}
          >
            <div>{props.title}</div>
            <div>{slots.content ? slots.content() : props.content}</div>
          </div>
        </s-tooltips>
        <div
          style="width: max-content;position: relative"
          onMouseenter={onPopperMouseEnter}
          onMouseleave={onPopperMouseleave}
          onClick={onPopperClick}
        >
          {slots.reference ? slots.reference() : null}
        </div>
      </div>
    );
  },
});
