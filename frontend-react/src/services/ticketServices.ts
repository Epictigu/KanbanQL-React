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
    NormalizedCacheObject,
} from "@apollo/client";

const API_URL = 'http://localhost:8080/graphql';

class TicketService {

    client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache({
            addTypename: false
        }),
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
        });
    }

    public fixTicketDetails(ticket: TicketDetails): void {
        ticket.status = this.convertStatusToEnumValue(ticket.status);
        ticket.priority = this.convertPriorityToEnumValue(ticket.priority);
    }

    public fixTicket(ticket: Ticket): void {
        ticket.status = this.convertStatusToEnumValue(ticket.status);
        ticket.priority = this.convertPriorityToEnumValue(ticket.priority);
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

    public updatePriority(id: string, priority: Priority): Promise<FetchResult<any>> {
        const priorityString: string = Priority[priority];
        return this.client.mutate({
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
                        title,
                        status,
                        priority,
                        tags {
                            id
                        }
                    }
                }`,
            variables: {
                id
            }
        });
}

    public updateStatus(id: string, status: TicketStatus): Promise<FetchResult<any>> {
        const statusString: string = TicketStatus[status];
        return this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!) {
                    updateTicket(
                        ticket: {
                            id: $id,
                            status: ${statusString}
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
                id
            }
        });
    }

    public updateTags(ticket: Ticket): Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!, $tags: [UpdateTagRequest]) {
                    updateTicket(
                        ticket: {
                            id: $id,
                            tags: $tags
                        }
                    )
                    {
                        id,
                        tags {
                            id
                        }
                    }
                }`,
            variables: {
                id: ticket.id,
                tags: ticket.tags
            }
        });
    }

    public updateTitle(id: string, title: string): Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!, $title: String!) {
                    updateTicket(
                        ticket: {
                            id: $id,
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
                id,
                title
            }
        });
    }

    public updateDescription(id: string, description: string): Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation updateTicket($id: String!, $description: String!) {
                    updateTicket(
                        ticket: {
                            id: $id,
                            description: $description
                        }
                    )
                    {
                        id,
                        description
                    }
                }`,
            variables: {
                id,
                description
            }
        })
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