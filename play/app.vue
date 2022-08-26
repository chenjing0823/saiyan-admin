<template>
  <div>测试</div>
  <SInput v-model="input" clear></SInput>
  {{ input }}
</template>

<script lang="ts" setup>


const getNum = (num: number) => {
  console.log(num)
}
import { ref } from "vue"
const input = ref('123')

</script>