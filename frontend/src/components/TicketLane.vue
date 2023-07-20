<template>
    <div
            class="ticket-lane"
            @dragover.prevent
            @dragenter.prevent
            @drop="onDrop"
    >
        <span class="lane-title" :style="colorStyle">{{ laneName }}</span>
        <TicketCard
                v-for="ticket in tickets"
                :ticket="ticket"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";
import type {Ticket} from "@/model/ticket";
import TicketCard from "@/components/TicketCard.vue";
import {useTicketStore} from "@/stores/ticketStore";
import type {TicketStatus} from "@/enum/ticketStatus";

export default defineComponent({
    name: "TicketLane",
    components: {
        TicketCard
    },
    setup() {
        const ticketStore = useTicketStore();

        return {ticketStore};
    },
    props: {
        tickets: {
            type: Array<Ticket>,
            required: true
        },
        laneName: {
            type: String,
            required: true
        },
        laneColor: {
            type: String,
            default: "gray"
        },
        laneStatus: {
            type: Number as PropType<TicketStatus>,
            required: true
        }
    },
    computed: {
        colorStyle() {
            return "border-top: 2px solid " + this.laneColor + ";"
        }
    },
    methods: {
        onDrop(event: DragEvent) {
            if (!event.dataTransfer) {
                return;
            }

            const ticketId = event.dataTransfer.getData("ticketID");
            const ticket = this.ticketStore.tickets.find((searchedTicket) => searchedTicket.id == ticketId);
            if (!ticket) {
                return;
            }

            ticket.status = this.laneStatus;
            this.ticketStore.moveTicketToTheTop(ticket);
        }
    }
})
</script>

<style scoped lang="less">
.ticket-lane {
  margin: 10px;
  width: 300px;
  height: calc(100% - 10px);

  .lane-title {
    display: block;
    width: 100%;
    height: 3.5em;
    border-radius: 4px;
    text-align: left;
    padding: 0 10px;
    line-height: 3.5em;
    margin-bottom: 30px;
    background-color: white;
    box-shadow: var(--lane-title-box-shadow-color) 1px 1px 4px;
    text-transform: uppercase;
    font-size: 0.85em;
    font-weight: 500;
    color: var(--basic-dark-text-color);
    pointer-events: none;
    user-select: none;
  }
}
</style>