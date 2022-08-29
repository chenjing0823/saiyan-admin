<template>
  <div>测试</div>
  <s-button color="pink">红色按钮</s-button>
  <s-input v-model="input" clearable></s-input>
  <s-input v-model="input" size="mini" clearable></s-input>
  <s-input v-model="input" size="small" clearable></s-input>
  <s-input v-model="input" size="medium" clearable></s-input>
  {{ input }}
</template>

<script lang="ts" setup>


const getNum = (num: number) => {
  console.log(num)
}
import { ref } from "vue"
const input = ref('123')

</script>