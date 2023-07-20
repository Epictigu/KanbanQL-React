import type {Ticket} from "@/model/ticket";
import {defineStore} from "pinia";
import {TicketStatus} from "@/enum/ticketStatus";
import {Priority} from "@/enum/priority";

export const useTicketStore = defineStore('ticketStore', {
    state: () => ({
        tickets: [] as Array<Ticket>
    }),
    getters: {},
    actions: {
        initialize(): void {
            this.tickets.push({
                id: "1",
                status: TicketStatus.BACKLOG,
                name: "Testticket",
                priority: Priority.MEDIUM,
                tags: ["1", "2"],
            });

            this.tickets.push({
                id: "2",
                status: TicketStatus.BACKLOG,
                name: "Boarddesign erstellen",
                priority: Priority.LOW,
                tags: ["1"],
            });
        },
        moveTicketToTheTop(ticket: Ticket): void {
            let index = this.tickets.indexOf(ticket);
            this.tickets.splice(index, 1);
            this.tickets.push(ticket)
        }
    }
});