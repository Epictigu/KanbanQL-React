package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.request.create.CreateCommentRequest;
import de.fhswf.kanbanql.request.create.CreateTagRequest;
import de.fhswf.kanbanql.request.create.CreateTicketRequest;
import de.fhswf.kanbanql.request.update.UpdateTicketRequest;
import de.fhswf.kanbanql.response.TicketResponse;
import de.fhswf.kanbanql.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GraphQLMutation {

    private final TicketService ticketService;

    @MutationMapping
    public Ticket createTicket(@Argument CreateTicketRequest ticket) {
        return ticketService.createTicket(ticket);
    }

    @MutationMapping
    public Tag createTag(@Argument CreateTagRequest tag){
        return ticketService.createTag(tag);
    }

    @MutationMapping
    public Comment createComment(@Argument CreateCommentRequest comment){
        return ticketService.createComment(comment);
    }

    @MutationMapping
    public Ticket updateTicket(@Argument UpdateTicketRequest ticket){
        return ticketService.updateTicket(ticket);
    }

    @MutationMapping
    public Ticket deleteTicket(@Argument String id){
        return ticketService.deleteTicket(id);
    }

    @MutationMapping
    public Tag deleteTag(@Argument String id){
        return ticketService.deleteTag(id);
    }
}
