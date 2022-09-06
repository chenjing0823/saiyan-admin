<template>
  <table
    class="saiyan-date-table"
    cellspacing="0"
    cellpadding="0"
    @click="handleClick"
  >
    <tbody>
      <tr>
        <th class="thcell" v-for="(week, key) in WEEKS" :key="key">
          {{ week }}
        </th>
      </tr>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellClasses(cell)" v-for="(cell, key) in row" :key="key">
          {{ cell.text }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
const _WEEKS = ["一", "二", "三", "四", "五", "六", "日"];
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
  isDate,
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
    defaultValue: {
      type: Date,
      validator(val) {
        // either: null, valid Date object, Array of valid Date objects
        return (
          val === null ||
          isDate(val) ||
          (Array.isArray(val) && val.every(isDate))
        );
      },
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

    const cellMatchesDate = (cell, date) => {
      const value = new Date(date);
      return (
        thisYear.value === value.getFullYear() &&
        thisMonth.value === value.getMonth() &&
        Number(cell.text) === value.getDate()
      );
    };

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
      const defaultValue = props.defaultValue
        ? Array.isArray(props.defaultValue)
          ? props.defaultValue
          : [props.defaultValue]
        : [];
      let classes = ["cell"];
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
      if (
        cell.type === "normal" &&
        defaultValue.some((date) => cellMatchesDate(cell, date))
      ) {
        classes.push("default");
      }
      return classes.join(" ");
    };
    return {
      handleClick,
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
.next-month,
.prev-month {
  color: #c0c4cc;
}
.today {
  color: #409eff;
}
.saiyan-date-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
}
.thcell {
  padding: 5px;
  color: #606266;
  font-weight: 400;
  border-bottom: 1px solid #ebeef5;
}
.cell {
  width: 42px;
  height: 30px;
  padding: 4px 0;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.default {
  background-color: #409eff;
  color: #fff;
}
tr:nth-child(2n) {
  background-color: unset;
}
tr {
  border-top: unset;
}
th,
td {
  border: unset;
}
</style>
