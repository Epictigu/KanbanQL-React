import {useTicketStore} from "@/stores/ticketStore";
import type {Ticket} from "@/model/ticket";
import {Priority} from "@/enum/priority";
import type {TicketDetails} from "@/model/ticketDetails";
import {TicketStatus} from "@/enum/ticketStatus";
import axios, {type AxiosResponse} from "axios";

const API_URL = 'http://localhost:8080/graphql';

class TicketService {

    public async fetchAllTickets(): Promise<AxiosResponse> {
        const data = {
            query: `
            query {
                getAllTickets {
                    id,
                    title,
                    status,
                    priority,
                    tags {
                        id
                    }
                }
            }`
        }
        return await axios.post(API_URL, data);
    }

    public async fetchTicketDetails(id: string): Promise<AxiosResponse> {
        const data = {
            query: `
            query getTicketById($id: String!) {
                getTicketById(id: $id) {
                    id,
                    title,
                    description
                    status,
                    priority,
                    tags {
                        id
                    },
                    comments {
                        id,
                        commentText,
                        creationDate
                    },
                    creationDate
                }
            }`,
            variables: {
                id
            }
        }
        return await axios.post(API_URL, data);
    }

    public fetchUpdatedCommentList(ticket: TicketDetails) {
        const data = {
            query: `
            query getAllCommentsForTicketId($id: String!) {
                getAllCommentsForTicketId(id: $id) {
                    id,
                    commentText,
                    creationDate
                }
            }`,
            variables: {
                id: ticket.id
            }
        }
        axios.post(API_URL, data)
            .then((result) => {
                ticket.comments = result.data.data.getAllCommentsForTicketId;
                this.fixTicketDetailsComments(ticket);
            });
    }

    public fixTicketDetails(ticket: TicketDetails): void {
        ticket.status = this.convertStatusToEnumValue(ticket.status);
        ticket.priority = this.convertPriorityToEnumValue(ticket.priority);
        ticket.creationDate = this.formatDateFromResponse(ticket.creationDate.toString());
        this.fixTicketDetailsComments(ticket);
    }

    private fixTicketDetailsComments(ticket: TicketDetails): void {
        ticket.comments.forEach((comment) => comment.creationDate = this.formatDateFromResponse(comment.creationDate.toString()));
    }

    private formatDateFromResponse(dateString: string): Date {
        let dateTimeSplit = dateString.split("T");
        let dateParts = dateTimeSplit[0].split("-");
        let timeParts = dateTimeSplit[1].split(".")[0].split(":");

        return new Date(Number.parseInt(dateParts[0]),
            Number.parseInt(dateParts[1]),
            Number.parseInt(dateParts[2]),
            Number.parseInt(timeParts[0]),
            Number.parseInt(timeParts[1]),
            Number.parseInt(timeParts[2]));
    }

    public convertStatusToEnumValue(status: TicketStatus): TicketStatus {
        return TicketStatus[status as unknown as keyof typeof TicketStatus];
    }

    public convertPriorityToEnumValue(priority: Priority): Priority {
        return Priority[priority as unknown as keyof typeof Priority];
    }

    public createNewTicketWithName(name: string): void {
        const data = {
            query: `
            mutation createTicket($title: String!) {
                createTicket(
                    ticket: {
                        title: $title
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                title: name
            }
        }
        axios.post(API_URL, data)
            .then(() => useTicketStore().initialize(),
                (error) => console.log(error));
    }

    public deleteTicket(id: string): void {
        const data = {
            query: `
            mutation deleteTicket($id: String!) {
                deleteTicket(id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        }
        axios.post(API_URL, data)
            .then(() => useTicketStore().initialize(),
                (error) => console.log(error));
    }

    public updatePriority(id: string, priority: Priority, ticketDetails?: TicketDetails): void {
        const priorityString: string = Priority[priority];
        const data = {
            query: `
            mutation updateTicket($id: String!) {
                updateTicket(
                    ticket: {
                        id: $id,
                        priority: ` + priorityString + `
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    useTicketStore().initialize();
                    if (ticketDetails) {
                        ticketDetails.priority = priority;
                    }
                },
                (error) => console.log(error));
    }

    public updateStatus(id: string, status: TicketStatus, ticketDetails?: TicketDetails): void {
        const statusString: string = TicketStatus[status];
        const data = {
            query: `
            mutation updateTicket($id: String!) {
                updateTicket(
                    ticket: {
                        id: $id,
                        status: ` + statusString + `
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    useTicketStore().initialize();
                    if (ticketDetails) {
                        ticketDetails.status = status;
                    }
                },
                (error) => console.log(error));
    }

    public updateTags(ticket: Ticket): void {
        const data = {
            query: `
            mutation updateTicket($id: String!, $tags: [UpdateTagRequest]) {
                updateTicket(
                    ticket: {
                        id: $id,
                        tags: $tags
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id: ticket.id,
                tags: ticket.tags
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    useTicketStore().initialize();
                },
                (error) => console.log(error));
    }

    public updateTitle(id: string, title: string, ticketDetails?: TicketDetails): void {
        const data = {
            query: `
            mutation updateTicket($id: String!, $title: String!) {
                updateTicket(
                    ticket: {
                        id: $id,
                        title: $title
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id,
                title
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    useTicketStore().initialize();
                    if (ticketDetails) {
                        ticketDetails.title = title;
                    }
                },
                (error) => console.log(error));
    }

    public updateDescription(id: string, description: string, ticketDetails?: TicketDetails): void {
        const data = {
            query: `
            mutation updateTicket($id: String!, $description: String!) {
                updateTicket(
                    ticket: {
                        id: $id,
                        description: $description
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id,
                description
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    useTicketStore().initialize();
                    if (ticketDetails) {
                        ticketDetails.description = description;
                    }
                },
                (error) => console.log(error));
    }

    public createComment(ticket: TicketDetails, comment: string): void {
        const data = {
            query: `
            mutation createComment($id: String!, $comment: String!) {
                createComment(
                    comment: {
                        ticketId: $id,
                        commentText: $comment
                    }
                )
                {
                    id
                }
            }`,
            variables: {
                id: ticket.id,
                comment
            }
        };
        axios.post(API_URL, data)
            .then(() => {
                    this.fetchUpdatedCommentList(ticket);
                },
                (error) => console.log(error));
    }
}

export default new TicketService();