<template>
    <div class="ticket-view">
        <BackgroundBlocker background-color="rgba(50, 50, 50, 0.4)"/>
        <div class="ticket-view-main">
            <TicketViewHeader/>
            <div class="ticket-column-container d-flex flex-row flex-grow-1">
                <TicketMainColumn/>
                <TicketSecondaryColumn/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import BackgroundBlocker from "@/components/utils/BackgroundBlocker.vue";
import TicketViewHeader from "@/components/ticketView/TicketViewHeader.vue";
import TicketMainColumn from "@/components/ticketView/TicketMainColumn.vue";
import TicketSecondaryColumn from "@/components/ticketView/TicketSecondaryColumn.vue";

export default defineComponent({
    name: "TicketView",
    components: {TicketSecondaryColumn, TicketMainColumn, BackgroundBlocker, TicketViewHeader}
})
</script>

<style scoped lang="less">
.ticket-view {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;

  .ticket-view-main {
    position: relative;
    z-index: 150;
    display: flex;
    flex-direction: column;

    margin: auto;
    max-width: 1600px;
    width: 100%;
    height: 90%;
    background: white;
    border-radius: 20px;
    box-shadow: var(--main-view-box-shadow-color) 0 2px 6px;
  }
}
</style>