import type {TicketStatus} from "@/enum/ticketStatus";
import type {Priority} from "@/enum/priority";
import type {Comment} from "@/model/comment";

export interface TicketDetails {

    id: string;

    status: TicketStatus;

    title: string;

    description: string;

    priority: Priority;

    tags: Array<string>;

    comments: Array<Comment>

    creationDate: Date;
}