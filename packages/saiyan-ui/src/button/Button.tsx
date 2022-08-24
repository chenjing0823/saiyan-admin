import { defineComponent, PropType } from "vue";
import "uno.css";

export type ISize = "small" | "medium" | "large";
export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export const props = {
  // 新增
  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },

  color: {
    type: String as PropType<IColor>,
    default: "blue",
  },

  round: {
    type: Boolean,
    default: false,
  },

  plain: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
    default: "",
  },

  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export default defineComponent({
  name: "SButton",
  props,
  setup(props, { slots }) {
    // console.log(`html`, document.querySelector(`#app`)?.innerHTML);

    const size = {
      small: {
        x: "2",
        y: "1",
        text: "xs",
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "sm",
      },
      large: {
        x: "4",
        y: "2",
        text: "base",
      },
    };

    const click = () => {
      console.log(111)
    }

    return () => (
      <button
        class={`
          py-${size[props.size].y}
          px-${size[props.size].x}
          ${props.round ? "rounded-full" : "rounded-lg"}
          border-solid
          text-${size[props.size].text}
          mx-1
          ${!props.disabled
            ? `
            bg-${props.color}-${props.plain ? "100" : "500"}
            hover:bg-${props.color}-400
            border-${props.color}-${props.plain ? "100" : "500"}
            text-${props.plain ? props.color + "-500" : "white"}
            cursor-pointer
            hover:text-white`
            : `
            bg-${props.color}-${props.plain ? "50" : "200"}
            text-${props.plain ? props.color + "-300" : "white"}
            border-${props.color}-${props.plain ? "100" : "200"}
            cursor-not-allowed
            `
          }
          `}
          disabled={ props.disabled }
          onClick={ click }
      >
        {props.icon !== "" ? (
          <i class={`i-ic-baseline-${props.icon} p-3`}></i>
        ) : (
          ""
        )}
        {slots.default ? slots.default() : ""}
      </button>
    );
  },
});