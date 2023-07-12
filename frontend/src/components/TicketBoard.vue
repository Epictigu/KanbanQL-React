<template>
    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTicketStore} from "@/stores/ticketStore";
import TicketCard from "@/components/TicketCard.vue";

export default defineComponent({
    name: "TicketBoard",
    components: {
        TicketCard
    },
    setup() {
        const ticketStore = useTicketStore();
        ticketStore.initialize();

        return {ticketStore};
    },
    computed: {
        tickets() {
            return this.ticketStore.tickets;
        }
    }
});
</script>

<style scoped>
</style>