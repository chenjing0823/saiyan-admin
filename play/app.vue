<template>
  <div>测试</div>
  <s-button color="pink">红色按钮</s-button>
  <s-input v-model="input" clearable></s-input>
  {{ input }}
  <div class="2112" style="display:flex;width: 400px">
    <s-popover
      placement="left"
      trigger="click"
      title="这是标题"
      content="这是内容">
      <template #reference>
        <s-button color="pink">hover</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="left"
      trigger="click"
      title="这是标题"
      content="这是内容">
      <template #content>12312</template>
      <template #reference>
        <s-button color="pink">click</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="left"
      trigger="manual"
      title="这是标题"
      content="这是内容"
      v-model="show">
      <template #content>12312</template>
      <template #reference>
        <s-button color="pink" @click="show = !show">manual</s-button>
        <div style="background-color: aliceblue;" @click="show = !show">
          <div style="width:200px;height: 100px"></div>
          <!-- <s-button color="pink">manual</s-button> -->
        </div>
      </template>
    </s-popover>
  </div>
  <s-tooltips></s-tooltips>
</template>

<script lang="ts" setup>


const getNum = (num: number) => {
  console.log(num)
}
import { ref } from "vue"
const input = ref('123')
const show = ref(false)

</script>