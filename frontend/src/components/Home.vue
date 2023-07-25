<template>
    <NavigationBar/>
    <TicketBoard @TicketSelect="selectTicket"/>
    <TicketView v-if="selectedTicket" @CloseTicketView="closeTicketView" :ticket="selectedTicket"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TicketBoard from "@/components/TicketBoard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import TicketView from "@/components/ticketView/TicketView.vue";
import type {Ticket} from "@/model/ticket";
import TicketService from "@/services/ticketService";
import type {TicketDetails} from "@/model/ticketDetails";

export default defineComponent({
    name: "Home",
    components: {
        TicketView,
        NavigationBar,
        TicketBoard
    },
    data() {
        return {
            selectedTicket: null as TicketDetails | null
        }
    },
    methods: {
        selectTicket(ticket: Ticket) {
            TicketService.fetchTicketDetails(ticket.id)
                .then(response => {
                    this.selectedTicket = response.data.data.getTicketById;
                    if (this.selectedTicket) {
                        TicketService.fixTicketDetails(this.selectedTicket);
                    }
                }, (error) => {
                    console.log("Error while fetching ticket details:");
                    console.log(error);
                });
        },
        closeTicketView() {
            this.selectedTicket = null;
        }
    }
});
</script>