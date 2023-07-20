<template>
    <div class="status-selector-container">
        <span>{{ currentStatus }}</span>
        <div class="status-selector-overlay">

        </div>
    </div>
</template>

<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import {TicketStatus} from "@/enum/ticketStatus";

export default defineComponent({
    name: "StatusSelector",
    props: {
        status: {
            type: Number as PropType<TicketStatus>
        }
    },
    computed: {
        TicketStatus() {
            return TicketStatus;
        },
        currentStatus() {
            switch (this.status) {
                case TicketStatus.IN_PROGRESS:
                    return "In Bearbeitung";
                case TicketStatus.BACKLOG:
                    return "Backlog";
                case TicketStatus.PLANNED:
                    return "In Planung";
                case TicketStatus.TO_REVIEW:
                    return "Im Review";
                case TicketStatus.DONE:
                    return "Abgeschlossen";
                default:
                    return "Ungültiger Status";
            }
        }
    }
});
</script>

<style scoped lang="less">
.status-selector-container {
  display: flex;
  flex-direction: column;
}
</style>