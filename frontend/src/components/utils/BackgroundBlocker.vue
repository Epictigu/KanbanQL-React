<template>
    <div class="click-blocker" :style="backgroundStyle"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "BackgroundBlocker",
    props: {
        backgroundColor: {
            type: String,
            default: "transparent"
        }
    },
    computed: {
        backgroundStyle(): string {
            return "background-color: " + this.backgroundColor;
        }
    }
})
</script>

<style scoped lang="less">
.click-blocker {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  cursor: default;
}
</style>