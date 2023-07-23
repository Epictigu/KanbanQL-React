import {useTicketStore} from "@/stores/ticketStore";
import type {Ticket} from "@/model/ticket";
import {Priority} from "@/enum/priority";
import type {TicketDetails} from "@/model/ticketDetails";
import {TicketStatus} from "@/enum/ticketStatus";
import type {Comment} from "@/model/comment";

class TicketService {

    createNewTicketWithName(name: string): void {
        let ticket = {
            id: "" + (useTicketStore().tickets.length + 1),
            name,
            status: 0,
            priority: Priority.LOW,
            tags: []
        } as Ticket;
        useTicketStore().tickets.push(ticket);
    }

    fetchTicketDetails(id: string): TicketDetails {
        let firstComment = {
            id: "1",
            name: "Dies ist ein Testkommentar.",
            creationDate: new Date()
        } as Comment;
        let secondComment = {
            id: "1",
            name: "Ein weiterer Kommentar.",
            creationDate: new Date()
        } as Comment;
        return {
            id,
            status: TicketStatus.DONE,
            title: "Testtitel",
            description: "",
            priority: Priority.MEDIUM,
            tags: [],
            comments: [firstComment, secondComment],
            creationDate: new Date()
        } as TicketDetails;
    }

    deleteTicket(id: string): void {

    }
}

export default new TicketService();