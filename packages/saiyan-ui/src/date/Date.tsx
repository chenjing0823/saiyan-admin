import { defineComponent, ref } from "vue";
import DateTable from "./basic/date-table.vue";
import "./date.css";
import {
  prevMonth as _prevMonth,
  nextMonth as _nextMonth,
  prevYear as _prevYear,
  nextYear as _nextYear,
} from "./basic/utils";
export const props = {
  modelValue: {
    type: String,
  },
  defaultValue: {
    type: String,
  },
} as const;
export default defineComponent({
  name: "SDatePicker",
  props,
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const date = ref(new Date());
    const showDate = ref("");
    const _defaultValue = ref(new Date(props.defaultValue));
    const selectionMode = ref("day");
    const closePopover = ref(false);
    const hasTime = ref(false);
    const prevMonth = () => {
      date.value = _prevMonth(date.value);
    };
    const nextMonth = () => {
      date.value = _nextMonth(date.value);
    };
    const prevYear = () => {
      date.value = _prevYear(date.value);
    };
    const nextYear = () => {
      date.value = _nextYear(date.value);
    };
    const handleDatePick = (value) => {
      if (selectionMode.value === "day") {
        showDate.value = `${value.getFullYear()}-${
          value.getMonth() + 1
        }-${value.getDate()}`;
        _defaultValue.value = value;
      }
      closePopover.value = true;
      hasTime.value = true;
      ctx.emit("update:modelValue", showDate.value);
    };

    const dateClear = () => {
      _defaultValue.value = null;
      hasTime.value = false;
      ctx.emit("update:modelValue", "");
    };

    const slots = {
      content: () => (
        <div class="s-popper__body_content">
          <div class="s-popper__body_content-title">
            <i
              onClick={prevYear}
              class="i-ic-outline-keyboard-double-arrow-left s-popper__body_content-title-icon"
            ></i>
            <i
              onClick={prevMonth}
              class="i-ic-outline-keyboard-arrow-left s-popper__body_content-title-icon"
            ></i>
            <span>
              {date.value.getFullYear()}年{date.value.getMonth() + 1}月
            </span>
            <i
              onClick={nextMonth}
              class="i-ic-outline-keyboard-arrow-right s-popper__body_content-title-icon"
            ></i>
            <i
              onClick={nextYear}
              class="i-ic-outline-keyboard-double-arrow-right s-popper__body_content-title-icon"
            ></i>
          </div>
          <DateTable
            v-model:date={date.value}
            onPick={handleDatePick}
            default-value={
              props.defaultValue || hasTime.value ? _defaultValue.value : null
            }
          ></DateTable>
        </div>
      ),
      reference: () => (
        <s-input
          placeholder="请选择日期"
          v-model={showDate.value}
          onFocus={() => {
            closePopover.value = false;
          }}
          clearable
          onClear={dateClear}
        ></s-input>
      ),
    };
    return () => (
      <div>
        <s-popover
          placement="bottom"
          trigger="click"
          title=""
          v-model:closePopover={closePopover.value}
          v-slots={slots}
        ></s-popover>
      </div>
    );
  },
});
