<template>
    <div class="main-column-container">
        <TicketStatusBar/>
        Test
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TicketStatusBar from "@/components/ticketView/TicketStatusBar.vue";

export default defineComponent({
    name: "TicketMainColumn",
    components: {TicketStatusBar}
});
</script>

<style scoped lang="less">
.main-column-container {
  width: 60%;
  border-right: 1px solid var(--navigation-border-color);
}
</style>