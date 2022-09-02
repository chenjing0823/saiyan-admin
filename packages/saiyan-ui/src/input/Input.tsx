import { defineComponent, ref, computed, PropType } from "vue";
// import "uno.css";

export type ISize = "small" | "medium" | "large";
export type TargetElement = HTMLInputElement | HTMLTextAreaElement;

export const props = {
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "请输入内容",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ISize>,
    default: "large",
  },
} as const;

export default defineComponent({
  name: "SInput",
  props,
  emits: [
    "change",
    "input",
    "focus",
    "focusout",
    "mousein",
    "mouseout",
    "update:modelValue",
  ],
  setup(props, ctx) {
    const size = {
      small: {
        y: "1",
        t: "0.16rem",
      },
      medium: {
        y: "2",
        t: "0.33rem",
      },
      large: {
        y: "3",
        t: "0.5rem",
      },
      mini: {
        y: "0",
        t: "0rem",
      },
    };

    const focus = ref<Boolean>(false);
    const mouse = ref<Boolean>(false);

    const showClear = computed(() => {
      if (props.clearable) {
        return !!(
          (props.modelValue && focus.value) ||
          (props.modelValue && mouse.value)
        );
      } else {
        return false;
      }
    });

    const handleChange = (event: Event) => {
      const { value } = event.target as TargetElement;
      ctx.emit("update:modelValue", value);
      ctx.emit("change", value);
    };

    const handleInput = (event: Event) => {
      const { value } = event.target as TargetElement;
      ctx.emit("update:modelValue", value);
      ctx.emit("input", value);
    };

    const handleClear = (event: Event) => {
      event.preventDefault();
      ctx.emit("update:modelValue", "");
    };

    const handleFocus = (event: Event) => {
      focus.value = true;
      ctx.emit("focus", event);
    };
    const handleFocusout = (event: Event) => {
      focus.value = false;
      ctx.emit("focusout", event);
    };
    const handleMouseenter = (event: Event) => {
      mouse.value = true;
      ctx.emit("mousein", event);
    };
    const handleMouseout = (event: Event) => {
      mouse.value = false;
      ctx.emit("mouseout", event);
    };
    // console.log(`html`, document.querySelector(`#app`)?.innerHTML);

    return () => (
      <div
        style="width: max-content;position: relative"
        class={`
        `}
      >
        <input
          class={`
            w-xs
            py-${size[props.size].y}
            px-3
            border-1
            border-gray
            rounded-lg
            focus-outline-unset
            focus-border-blue
            ${props.disabled ? "bg-gray-100" : ""}
          `}
          type="text"
          value={props.modelValue}
          onChange={handleChange}
          onInput={handleInput}
          onFocusin={handleFocus}
          onFocusout={handleFocusout}
          onMouseenter={handleMouseenter}
          onMouseout={handleMouseout}
          placeholder={props.placeholder}
          disabled={props.disabled}
        ></input>
        {showClear.value ? (
          <span
            class={`py-1 cursor-pointer`}
            style={`position: absolute;right: 5px;top: 0;height: 100%;padding-top: ${
              size[props.size].t
            }`}
            onMousedown={handleClear}
          >
            <i class={`i-ic-baseline-clear px-3 color-gray-500`}></i>
          </span>
        ) : (
          ""
        )}
      </div>
    );
  },
});
