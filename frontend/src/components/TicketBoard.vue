<template>
    <div class="ticket-board">
        <TicketLane
            lane-name="Backlog"
            :lane-status="TicketStatus.BACKLOG"
            :tickets="ticketsByStatus(TicketStatus.BACKLOG)"
            @TicketSelect="selectTicket"
        />
        <TicketLane
            lane-name="Geplant"
            lane-color="#C59916"
            :lane-status="TicketStatus.PLANNED"
            :tickets="ticketsByStatus(TicketStatus.PLANNED)"
            @TicketSelect="selectTicket"
        />
        <TicketLane
            lane-name="In Arbeit"
            lane-color="#C70039"
            :lane-status="TicketStatus.IN_PROGRESS"
            :tickets="ticketsByStatus(TicketStatus.IN_PROGRESS)"
            @TicketSelect="selectTicket"
        />
        <TicketLane
            lane-name="In Review"
            lane-color="#054AD5"
            :lane-status="TicketStatus.TO_REVIEW"
            :tickets="ticketsByStatus(TicketStatus.TO_REVIEW)"
            @TicketSelect="selectTicket"
        />
        <TicketLane
            lane-name="Abgeschlossen"
            lane-color="#55AB3C"
            :lane-status="TicketStatus.DONE"
            :tickets="ticketsByStatus(TicketStatus.DONE)"
            @TicketSelect="selectTicket"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTicketStore} from "@/stores/ticketStore";
import TicketLane from "@/components/TicketLane.vue";
import type {Ticket} from "@/model/ticket";
import {TicketStatus} from "@/enum/ticketStatus";
import {useTagStore} from "@/stores/tagStore";

export default defineComponent({
    name: "TicketBoard",
    emits: ["TicketSelect"],
    components: {
        TicketLane,
    },
    setup() {
        const ticketStore = useTicketStore();
        const tagStore = useTagStore();
        ticketStore.initialize();
        tagStore.initialize();

        return {ticketStore};
    },
    computed: {
        TicketStatus() {
            return TicketStatus;
        },
        tickets() {
            return this.ticketStore.tickets;
        }
    },
    methods: {
        ticketsByStatus(status: TicketStatus): Array<Ticket> {
            return this.tickets.filter(ticket => ticket.status === status);
        },
        selectTicket(ticket: Ticket) {
            this.$emit("TicketSelect", ticket);
        }
    }
});
</script>

<style scoped>
.ticket-board {
    display: flex;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
}
</style>