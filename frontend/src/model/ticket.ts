import type {TicketStatus} from "@/enum/ticketStatus";
import type {Priority} from "@/enum/priority";

export interface Ticket {

    id: string;

    status: TicketStatus;

    name: string;

    priority: Priority;

    tags: Array<string>;
}