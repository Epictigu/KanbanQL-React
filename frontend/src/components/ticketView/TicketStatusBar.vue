<template>
    <div class="ticket-status-bar">
        <StatusSelector :status="status"/>
        <PrioritySelector
                v-if="priority !== undefined"
                :current-priority="priority"
                @selectPriority="selectPriority"/>
    </div>
</template>

<script lang="ts">
import {Priority} from "@/enum/priority";
import {TicketStatus} from "@/enum/ticketStatus";
import type {PropType} from "vue";
import {defineComponent} from "vue";
import PrioritySelector from "@/components/PrioritySelector.vue";
import StatusSelector from "@/components/ticketView/StatusSelector.vue";

export default defineComponent({
    name: "TicketStatusBar",
    components: {StatusSelector, PrioritySelector},
    props: {
        priority: {
            type: Number as PropType<Priority>,
            default: Priority.LOW
        },
        status: {
            type: Number as PropType<TicketStatus>,
            default: TicketStatus.BACKLOG
        }
    },
    emits: ["selectPriority"],
    methods: {
        selectPriority(priority: Priority) {
            this.$emit("selectPriority", priority);
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
}
</style>