import type {Ticket} from "@/model/ticket";
import {defineStore} from "pinia";

export const useTicketStore = defineStore('ticketStore', {
    state: () => ({
        tickets: [] as Array<Ticket>
    }),
    getters: {},
    actions: {
        initialize(): void {
            this.tickets.push({
                id: "1",
                name: "Testticket",
                description: "Testdescription"
            });

            this.tickets.push({
                id: "2",
                name: "Boarddesign erstellen",
                description: "Das Kanbanboard muss designed werden."
            });
        }
    }
});