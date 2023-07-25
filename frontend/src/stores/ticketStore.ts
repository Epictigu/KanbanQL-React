import type {Ticket} from "@/model/ticket";
import {defineStore} from "pinia";
import TicketService from "@/services/ticketService";

export const useTicketStore = defineStore('ticketStore', {
    state: () => ({
        tickets: [] as Array<Ticket>
    }),
    getters: {},
    actions: {
        initialize(): void {
            TicketService.fetchAllTickets()
                .then(response => {
                    this.tickets = response.data.data.getAllTickets;
                    this.tickets.forEach(ticket =>
                        ticket.status = TicketService.convertStatusToEnumValue(ticket.status));
                    this.tickets.forEach(ticket =>
                        ticket.priority = TicketService.convertPriorityToEnumValue(ticket.priority));
                }, (error) => {
                    console.log("Error while fetching all tickets:");
                    console.log(error);
                });
        },
        moveTicketToTheTop(ticket: Ticket): void {
            let index = this.tickets.indexOf(ticket);
            this.tickets.splice(index, 1);
            this.tickets.push(ticket)
        }
    }
});