import type {Priority} from "../enum/priority";
import type {TicketStatus} from "../enum/ticketStatus.ts";
import type {Comment} from "./comment.ts";

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