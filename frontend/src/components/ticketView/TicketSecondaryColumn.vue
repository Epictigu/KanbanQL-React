<template>
    <div class="secondary-column-container">
        <TicketCommentHeader/>
        <TicketComments/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TicketCommentHeader from "@/components/ticketView/TicketCommentHeader.vue";
import TicketComments from "@/components/ticketView/TicketComments.vue";

export default defineComponent({
    name: "TicketSecondaryColumn",
    components: {TicketComments, TicketCommentHeader}
});
</script>

<style scoped lang="less">
.secondary-column-container {
  width: 40%;
  background-color: var(--main-view-secondary-background-color);
  display: flex;
  flex-direction: column;
}
</style>