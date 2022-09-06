<template>
  <div>测试</div>
  <s-button color="pink">红色按钮</s-button>
  <s-input v-model="input" clearable></s-input>
  {{ input }}{{time}}zskhjzckj
  <div class="box">
    <popover></popover>
  </div>
  <div class="box">
    <s-date-picker v-model="time" :defaultValue="defaultValue"></s-date-picker>
  </div>
    {{ time }}
  <s-tooltips></s-tooltips>
</template>

<script lang="ts" setup>

const getNum = (num: number) => {
  console.log(num)
}
import { ref } from "vue"
import popover from './components/popover.vue'
const input = ref('123')
const defaultValue = ref('2022-09-22')
const time = ref('')

</script>

<style>
.box {
  display:flex;
  width: 100%;
  justify-content: space-around;
}
</style>