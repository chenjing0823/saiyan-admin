import Input from "../Input";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// 测试分组
describe("Input", () => {
  test("disabled: true", () => {
    const wrapper = shallowMount(Input, {
      slots: {
        default: "Input",
      },
      props: {
        disabled: true,
      },
    });

    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("bg-gray-100")
    ).toBe(false);
  });

  test("clearable: true", () => {
    const wrapper = shallowMount(Input, {
      slots: {
        default: "Input",
      },
      props: {
        clearable: true,
      },
    });

    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("i-ic-baseline-clear")
    ).toBe(false);
  });
});
