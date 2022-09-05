# Popover 弹出框


## 基础用法

:::demo `trigger`属性用于设置何时触发 Popover，支持三种触发方式：`hover`，`click` 和 `manual`。

```vue
<template>
  <div style="margin-bottom: 20px;display: flex;">
    <s-popover
      trigger="hover"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>hover 激活</s-button>
      </template>
    </s-popover>
    <s-popover
      trigger="click"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>click 激活</s-button>
      </template>
    </s-popover>
    <s-popover
      trigger="manual"
      title="这是标题"
      content="这是内容一行内容"
      v-model="show">
      <template #reference>
        <s-button @click="show = !show">manual 激活</s-button>
      </template>
    </s-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

```
:::
## 弹出位置

:::demo `placement`属性用于设置弹出框的位置，一共有上下左右四个位置：`top`, `bottom`, `left`, `right`。


```vue
<template>
  <div style="margin-bottom: 20px;display: flex;">
    <s-popover
      placement="top"
      trigger="click"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>click 上</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="bottom"
      trigger="click"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>click 下</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="left"
      trigger="click"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>click 左</s-button>
      </template>
    </s-popover>
    <s-popover
      placement="right"
      trigger="click"
      title="这是标题"
      content="这是内容一行内容">
      <template #reference>
        <s-button>click 右</s-button>
      </template>
    </s-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

```
:::
## 嵌套信息

:::demo 利用分发取代content属性


```vue
<template>
  <div style="margin-bottom: 20px;display: flex;">
    <s-popover
      placement="bottom"
      trigger="click"
      title="这是标题">
      <template #content>
        <s-input></s-input>
        <s-button>按钮</s-button>
      </template>
      <template #reference>
        <s-button>嵌套信息</s-button>
      </template>
    </s-popover>
  </div>
</template>


```
:::
