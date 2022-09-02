import { defineComponent, ref, Transition } from "vue";
import "./popper.css";
// import "uno.css";

export const props = {
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
  name: "SPopper",
  emits: [],
  props,
  setup(props, ctx) {
    const visible = ref(false);
    const { slots } = ctx;

    const position = ref("");

    const heightWidth = (event: Event) => {
      const width = (event.currentTarget as HTMLElement).offsetWidth;
      const height = (event.currentTarget as HTMLElement).offsetHeight;

      const { placement } = props;
      if (placement === "top") {
        position.value = `bottom: 0px;`;
      } else if (placement === "right") {
        position.value = `left: ${width}px;top: -${height / 2}px;`;
      } else if (placement === "bottom") {
        position.value = `top: ${height}px;`;
      } else if (placement === "left") {
        position.value = `right: ${width}px;top: -${height / 2}px;`;
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
      if (props.trigger === "click" || props.trigger === "manual") {
        heightWidth(event);
        visible.value = !visible.value;
      }
      console.log(visible.value);
    };
    const onPopperFocusout = () => {
      if (props.trigger === "manual") {
        visible.value = false;
      }
    };
    // console.log(`html`, document.querySelector(`#app`)?.innerHTML);

    return () => (
      <div>
        {visible.value}
        <Transition name="fade">
          <div
            style="width: max-content;position: relative"
            v-show={visible.value}
            class={`bg-blue-500`}
          >
            <div
              class={`
              s-popper__body`}
              style={`${position.value}`}
            >
              <div>{props.title}</div>
              <div>{slots.content ? slots.content() : props.content}</div>
            </div>
          </div>
        </Transition>
        <div
          style="width: max-content;position: relative"
          onMouseenter={onPopperMouseEnter}
          onMouseleave={onPopperMouseleave}
          onClick={onPopperClick}
          onFocusout={onPopperFocusout}
        >
          {slots.reference ? slots.reference() : null}
        </div>
      </div>
    );
  },
});
