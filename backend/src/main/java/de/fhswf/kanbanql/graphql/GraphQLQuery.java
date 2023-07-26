package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class GraphQLQuery {

    private final TicketService ticketService;

    @QueryMapping
    public Ticket getTicketById(@Argument String id){ return ticketService.getTicketById(id); }

    @QueryMapping
    public List<Ticket> getAllTickets() { return ticketService.getAllTickets(); }

    @QueryMapping
    public Tag getTagById(@Argument String id){
        return ticketService.getTagById(id);
    }

    @QueryMapping
    public List<Tag> getAllTags(){
        return ticketService.getAllTags();
    }

    @QueryMapping
    public Comment getCommentById(@Argument String id){
        return ticketService.getCommentById(id);
    }

    @QueryMapping
    public List<Comment> getAllComments(){
        return ticketService.getAllComments();
    }

}
