import { defineComponent, ref } from "vue";
import DateTable from "./basic/date-table.vue";
import {
  prevMonth as _prevMonth,
  nextMonth as _nextMonth,
} from "./basic/utils";
export default defineComponent({
  name: "SDate",
  setup() {
    const date = ref(new Date());
    const selectionMode = ref("day");
    const prevMonth = () => {
      date.value = _prevMonth(date.value);
    };
    const nextMonth = () => {
      date.value = _nextMonth(date.value);
    };
    const handleDatePick = (value) => {
      if (selectionMode.value === "day") {
        // selectionMode.value = "month";
        console.log(value.getFullYear(), value.getMonth() + 1, value.getDate());
        console.log(value.getTime());
      }
    };
    return () => (
      <div>
        <s-button onClick={prevMonth}>上个月</s-button>
        <s-button onClick={nextMonth}>下个月</s-button>
        <DateTable
          v-model:date={date.value}
          onPick={handleDatePick}
        ></DateTable>
        <span>123</span>
      </div>
    );
  },
});
