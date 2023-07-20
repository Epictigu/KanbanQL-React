<template>
    <div id="app">
        <div class="main-container">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    components: {},
});
</script>

<style lang="less">
@import "./assets/colors.css";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

:root {
    overflow-y: auto;
}

html,
body {
    margin: 0;
    height: 100%;
}

#app {
    height: 100%;
    width: 100%;

    font-family: Roboto, serif;
    background-color: var(--main-background-color);

    display: flex;
    flex-direction: column;

    .main-container {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
    }
}
</style>