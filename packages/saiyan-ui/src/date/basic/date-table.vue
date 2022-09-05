<template>
  <table
    cellspacing="0"
    cellpadding="0"
    @click="handleClick"
    @mousemove="handleMouseMove"
  >
    <tbody>
      <tr>
        <th class="cell" v-for="(week, key) in WEEKS" :key="key">{{ week }}</th>
      </tr>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellClasses(cell)" v-for="(cell, key) in row" :key="key">
          <span>{{ cell.text }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
const _WEEKS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const getDateTimestamp = function (time) {
  if (typeof time === "number" || typeof time === "string") {
    return _clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return _clearTime(time).getTime();
  } else {
    return NaN;
  }
};
import { computed } from "vue";
import {
  getStartDateOfMonth,
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getWeekNumber,
  nextDate,
  clearTime as _clearTime,
} from "./utils";
export default {
  name: "DateTable",
  props: {
    firstDayOfWeek: {
      type: Number,
      default: 7,
      validator: (val) => val >= 1 && val <= 7,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    showWeekNumber: {
      type: Boolean,
      default: false,
    },
    disabledDate: {
      type: Function,
      default: () => false,
    },
    selectionMode: {
      type: String,
      default: "day",
    },
  },
  setup(props, ctx) {
    const tableRows = [[], [], [], [], [], []];

    const offsetDay = computed(() => {
      const week = props.firstDayOfWeek;

      // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
      return week > 3 ? 7 - week : -week;
    });
    const thisYear = computed(() => {
      return props.date.getFullYear();
    });
    const thisMonth = computed(() => {
      return props.date.getMonth();
    });
    const startDate = computed(() => {
      return getStartDateOfMonth(thisYear.value, thisMonth.value);
    });

    const getDateOfCell = (row, column) => {
      const offsetFromStart =
        row * 7 + (column - (props.showWeekNumber ? 1 : 0)) - offsetDay.value;
      return nextDate(startDate.value, offsetFromStart);
    };
    const handleClick = (event) => {
      let target = event.target;
      if (target.tagName === "SPAN") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }

      if (target.tagName !== "TD") return;

      const row = target.parentNode.rowIndex - 1;
      const column = props.selectionMode === "week" ? 1 : target.cellIndex;
      const cell = rows.value[row][column];

      if (cell.disabled || cell.type === "week") return;
      const newDate = getDateOfCell(row, column);
      console.log("newDate", newDate);
      if (props.selectionMode === "day") {
        ctx.emit("pick", newDate);
      }
      // console.log(e);
    };
    const handleMouseMove = (e: MouseEvent) => {
      // console.log(e);
    };
    const WEEKS = computed(() => {
      const firstDayOfWeek = props.firstDayOfWeek || 7;
      console.log("firstDayOfWeek", firstDayOfWeek);
      console.log("props.firstDayOfWeek", props.firstDayOfWeek);
      const weeks = _WEEKS.slice(firstDayOfWeek - 1);
      return weeks.concat(_WEEKS.slice(0, firstDayOfWeek - 1));
    });

    const rows = computed(() => {
      const date = new Date(thisYear.value, thisMonth.value, 1);
      let day = getFirstDayOfMonth(date);
      const dateCountOfMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth()
      );
      const dateCountOfLastMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth() === 0 ? 11 : date.getMonth() - 1
      );

      day = day === 0 ? 7 : day;

      const offset = offsetDay.value;
      const rows = tableRows;
      let count = 1;

      const _startDate = startDate.value;
      const _disabledDate = props.disabledDate;
      const now = getDateTimestamp(new Date());
      for (let i = 0; i < 6; i++) {
        const row = rows[i];

        if (props.showWeekNumber) {
          if (!row[0]) {
            row[0] = {
              text: getWeekNumber(nextDate(_startDate, i * 7 + 1)),
              type: "week",
            };
          }
        }
        for (let j = 0; j < 7; j++) {
          let cell = row[props.showWeekNumber ? j + 1 : j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false,
            };
          }
          cell.type = "normal";

          const index = i * 7 + j;
          const time = nextDate(_startDate, index - offset).getTime();
          const isToday = time === now;

          if (isToday) {
            cell.type = "today";
          }

          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth =
              day + offset < 0 ? 7 + day + offset : day + offset;

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text =
                dateCountOfLastMonth -
                numberOfDaysFromPreviousMonth +
                j +
                i * 7 +
                1;
              cell.type = "prev-month";
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = "next-month";
            }
          }

          let cellDate = new Date(time);
          cell.disabled =
            typeof _disabledDate === "function" && _disabledDate(cellDate);

          row[props.showWeekNumber ? j + 1 : j] = cell;
        }
      }
      return rows;
    });

    const getCellClasses = (cell) => {
      let classes = [];
      if (cell.type === "normal") {
        classes.push("normal");
      } else if (cell.type === "today") {
        classes.push("today");
      } else if (cell.type === "prev-month") {
        classes.push("prev-month");
      } else if (cell.type === "next-month") {
        classes.push("next-month");
      } else if (cell.type === "week") {
        classes.push("week");
      }
      return classes.join(" ");
    };
    return {
      handleClick,
      handleMouseMove,
      WEEKS,
      thisYear,
      thisMonth,
      startDate,
      rows,
      getCellClasses,
    };
  },
};
</script>

<style>
.cell {
  padding: 0 5px;
}
.next-month,
.prev-month {
  color: #c0c4cc;
}
.today {
  color: #409eff;
}
</style>
