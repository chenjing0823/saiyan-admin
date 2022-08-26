# Input 输入框
常用操作按钮

## 基础用法

:::demo 

```vue
<template>
 <div style="margin-bottom:20px;">
  <SInput v-model="input" placeholder="请输入内容"></SInput>
 </div>
</template>

<script lang="ts" setup>

import { ref } from "vue"
const input = ref('')

</script>
```
:::
## 禁用状态


:::demo 通过 disabled 属性指定是否禁用 input 组件


```vue
<template>
 <div style="margin-bottom:20px;">
  <SInput v-model="input" placeholder="请输入内容" :disabled="true"></SInput>
 </div>
</template>

<script lang="ts" setup>

import { ref } from "vue"
const input = ref('')

</script>
```
:::

## 可清空


:::demo 使用 clearable 属性即可得到一个可清空的输入框

```vue
<template>
 <div style="margin-bottom:20px;">
  <SInput v-model="input" placeholder="请输入内容" clearable></SInput>
 </div>
</template>

<script lang="ts" setup>

import { ref } from "vue"
const input = ref('')

</script>
```
:::
