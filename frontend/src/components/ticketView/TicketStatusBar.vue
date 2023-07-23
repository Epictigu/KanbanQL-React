<template>
    <div class="ticket-status-bar" v-if="ticket">
        <StatusSelector :status="ticket.status" class="mr-3"/>
        <hr style="rotate: 90deg;width: 1.5em"/>
        <PrioritySelector
            class="ml-3"
            :current-priority="ticket.priority"
            @selectPriority="selectPriority"/>
        <i class="fa-solid fa-trash" @click="deleteTicket" role="button"/>
    </div>
</template>

<script lang="ts">
import type {Priority} from "@/enum/priority";
import type {PropType} from "vue";
import {defineComponent} from "vue";
import PrioritySelector from "@/components/PrioritySelector.vue";
import StatusSelector from "@/components/ticketView/StatusSelector.vue";
import type {TicketDetails} from "@/model/ticketDetails";
import TicketService from "@/services/ticketService";

export default defineComponent({
    name: "TicketStatusBar",
    components: {StatusSelector, PrioritySelector},
    props: {
        ticket: {
            type: Object as PropType<TicketDetails>,
            required: true
        }
    },
    emits: ["selectPriority", "CloseTicketView"],
    methods: {
        selectPriority(priority: Priority) {
            this.$emit("selectPriority", priority);
        },
        deleteTicket() {
            TicketService.deleteTicket(this.ticket.id);
            this.$emit("CloseTicketView");
        }
    }
});
</script>

<style scoped lang="less">
.ticket-status-bar {
    width: 100%;
    padding: 20px;
    height: 80px;
    border-bottom: 1px solid var(--navigation-border-color);
    display: flex;
    align-items: center;
}
</style>