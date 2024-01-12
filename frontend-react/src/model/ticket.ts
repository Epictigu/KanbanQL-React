import type {TicketStatus} from "../enum/ticketStatus";
import type {Priority} from "../enum/priority";
import type {TagId} from "./tagId";

export interface Ticket {

    id: string;

    status: TicketStatus;

    title: string;

    priority: Priority;

    tags: Array<TagId>;
}