<template>
    <div class="secondary-column-container">
        <TicketCommentHeader :ticket="ticket"/>
        <TicketComments :ticket="ticket"/>
    </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";
import TicketCommentHeader from "@/components/ticketView/TicketCommentHeader.vue";
import TicketComments from "@/components/ticketView/TicketComments.vue";
import type {TicketDetails} from "@/model/ticketDetails";

export default defineComponent({
    name: "TicketSecondaryColumn",
    components: {TicketComments, TicketCommentHeader},
    props: {
        ticket: {
            type: Object as PropType<TicketDetails>,
            required: true
        }
    },
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