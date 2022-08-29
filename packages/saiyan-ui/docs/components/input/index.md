# Input 输入框
常用操作按钮

## 基础用法

:::demo 

```vue
<template>
 <div style="margin-bottom:20px;">
  <s-input v-model="input" placeholder="请输入内容"></s-input>
 </div>
</template>

<script>

export default {
  data () {
    return {
      input: ''
    }
  }
}

</script>
```
:::
## 禁用状态


:::demo 通过 disabled 属性指定是否禁用 input 组件


```vue
<template>
 <div style="margin-bottom:20px;">
  <s-input v-model="input" placeholder="请输入内容" :disabled="true"></s-input>
 </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}

</script>
```
:::

## 可清空


:::demo 使用 clearable 属性即可得到一个可清空的输入框

```vue
<template>
 <div style="margin-bottom:20px;">
  <s-input v-model="input" placeholder="请输入内容" clearable></s-input>
 </div>
</template>

<script>

export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>
```
:::
## 尺寸


:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 medium、small 和 mini 三种尺寸。

```vue
<template>
 <div style="margin-bottom:20px;">
  <s-input v-model="input1" placeholder="默认大小"></s-input>
 </div>
 <div style="margin-bottom:20px;">
  <s-input v-model="input2" placeholder="medium" size="medium"></s-input>
 </div>
 <div style="margin-bottom:20px;">
  <s-input v-model="input3" placeholder="small" size="small"></s-input>
 </div>
 <div style="margin-bottom:20px;">
  <s-input v-model="input4" placeholder="mini" size="mini"></s-input>
 </div>

</template>

<script>

export default {
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::
