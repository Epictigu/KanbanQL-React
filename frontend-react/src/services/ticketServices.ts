import type {Ticket} from "../model/ticket";
import {Priority} from "../enum/priority";
import type {TicketDetails} from "../model/ticketDetails";
import {TicketStatus} from "../enum/ticketStatus";
import {
    ApolloClient,
    ApolloQueryResult,
    FetchResult,
    gql,
    InMemoryCache,
    NormalizedCacheObject
} from "@apollo/client";

const API_URL = 'http://localhost:8080/graphql';

class TicketService {

    client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache(),
        connectToDevTools: true
    });

    public async fetchAllTickets(): Promise<ApolloQueryResult<any>> {
        return await this.client.query({
            query: gql`
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
        });
    }

    public async fetchTicketDetails(id: string): Promise<ApolloQueryResult<any>> {
        return await this.client.query({
            query: gql`
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
        });
    }

    public fetchUpdatedCommentList(ticket: TicketDetails) {
        this.client.query({
            query: gql`
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
        })
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

    public createNewTicketWithName(name: string) : Promise<FetchResult<any>>{
        return this.client.mutate({
            mutation: gql`
                mutation createTicket($title: String!) {
                    createTicket(
                        ticket: {
                            title: $title
                        }
                    )
                    {
                        id,
                        title,
                        status,
                        priority,
                        tags {
                            id
                        }
                    }
                }`,
            variables: {
                title: name
            }
        })
    }

    public deleteTicket(id: string) : Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation deleteTicket($id: String!) {
                    deleteTicket(id: $id) {
                        id
                    }
                }`,
            variables: {
                id
            }
        });
    }

    public updatePriority(id: string, priority: Priority, callback: Function): void {
        const priorityString: string = Priority[priority];
        this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!) {
                    updateTicket(
                        ticket: {
                            id: $id,
                            priority: ${priorityString}
                        }
                    )
                    {
                        id,
                        priority
                    }
                }`,
            variables: {
                id
            }
        }).then(() => {
            callback();
        },
        (error) => console.log(error));
}

    public updateStatus(id: string, status: TicketStatus, callback: Function): void {
        const statusString: string = TicketStatus[status];
        this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!) {
                    updateTicket(
                        ticket: {
                            id: $id,
                            status: ${statusString}
                        }
                    )
                    {
                        id
                    }
                }`,
            variables: {
                id,
                status
            }
        }).then(() => {
            callback();
        },
        (error) => console.log(error));
    }

    public updateTags(ticket: Ticket): void {
        this.client.mutate({
            mutation: gql`
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
        }).then(() => {
            },
            (error) => console.log(error));
    }

    public updateTitle(id: string, title: string, ticketDetails?: TicketDetails): void {
        this.client.mutate({
            mutation: gql`
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
        }).then(() => {
                if (ticketDetails) {
                    ticketDetails.title = title;
                }
            },
            (error) => console.log(error));
    }

    public updateDescription(id: string, description: string, ticketDetails?: TicketDetails): void {
        this.client.mutate({
            mutation: gql`
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
        }).then(() => {
                if (ticketDetails) {
                    ticketDetails.description = description;
                }
            },
            (error) => console.log(error));
    }

    public createComment(ticket: TicketDetails, comment: string): void {
        this.client.mutate({
            mutation: gql`
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
        }).then(() => {
                this.fetchUpdatedCommentList(ticket);
            },
            (error) => console.log(error));
    }
}

export default new TicketService();