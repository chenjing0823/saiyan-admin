<template>
    <s-popover
      placement="top"
      trigger="hover"
      title="这是标题"
      content="这是内容">
      <template #reference>
        <s-button color="pink">hover</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="top"
      trigger="click"
      title="这是标题"
      content="这是内容">
      <template #content>12312</template>
      <template #reference>
        <s-button color="pink">click</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="top"
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
</template>
<script lang="ts" setup>

import { ref } from "vue"
const show = ref(false)

</script>