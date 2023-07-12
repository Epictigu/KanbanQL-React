<template>
    <div class="ticket-card" v-if="ticket">
        <span class="ticket-name">{{ ticket.name }}</span>
    </div>
</template>

<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {Ticket} from "@/model/ticket";

export default defineComponent({
    name: "TicketCard",
    components: {},
    props: {
        ticket: {
            type: Object as PropType<Ticket>
        }
    }
});
</script>

<style scoped>
.ticket-card {
    flex-direction: column;
    display: flex;
    border: 1px solid lightgray;
    border-radius: 4px;
    max-width: 300px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    box-shadow: rgba(187, 187, 187, 0.34) 1px 1px 2px;
}
</style>