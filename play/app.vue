<template>
  <div>测试</div>
  <s-button color="pink">红色按钮</s-button>
  <s-input v-model="input" clearable></s-input>
  {{ input }}
  <s-popper
    placement="right"
    trigger="hover"
    title="这是标题"
    content="这是内容">
    <template #reference>
      <s-button color="pink">hover</s-button>
    </template>
  </s-popper>
  <s-popper
    trigger="click"
    title="这是标题"
    content="这是内容">
    <template #content>12312</template>
    <template #reference>
      <s-button color="pink">click</s-button>
    </template>
  </s-popper>
  <s-popper
    trigger="manual"
    title="这是标题"
    content="这是内容">
    <template #content>12312</template>
    <template #reference>
      <s-button color="pink">manual</s-button>
      <div style="background-color: aliceblue;">
        <div style="width:200px;height: 100px"></div>
        <!-- <s-button color="pink">manual</s-button> -->
      </div>
    </template>
  </s-popper>
</template>

<script lang="ts" setup>


const getNum = (num: number) => {
  console.log(num)
}
import { ref } from "vue"
const input = ref('123')

</script>