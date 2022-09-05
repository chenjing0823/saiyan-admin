<template>
  <div ref="tooltips" class="s-tooltips">
    <transition name="fade">
      <slot>{{ content }}</slot>
    </transition>
    <!-- <slot></slot> -->
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
export default {
  name: "STooltips",

  props: {
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
    content: {
      type: String,
      default: "zsdasdas",
    },
  },

  setup(props, ctx) {
    console.log(props, ctx);
    const tooltips = ref(null);
    const show = ref(true);
    onMounted(() => {
      const body = document.body;
      body.appendChild(tooltips.value);
      // console.log(tooltips);
    });
    onBeforeUnmount(() => {
      const body = document.body;
      body.removeChild(tooltips.value);
    });
    return {
      tooltips,
      show,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
