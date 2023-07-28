package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.services.CommentService;
import de.fhswf.kanbanql.services.TagService;
import de.fhswf.kanbanql.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * This class contains the various queries provided through the graphql schema. The logic itself is located inside the various services, as to not
 * mix different levels of code.
 */
@RequiredArgsConstructor
@Controller
public class GraphQLQuery {

    private final TicketService ticketService;
    private final TagService tagService;
    private final CommentService commentService;

    @QueryMapping
    public Ticket getTicketById(@Argument String id) {
        return ticketService.getTicketById(id);
    }

    @QueryMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @QueryMapping
    public Tag getTagById(@Argument String id) {
        return tagService.getTagById(id);
    }

    @QueryMapping
    public List<Tag> getAllTags(){
        return tagService.getAllTags();
    }

    @QueryMapping
    public Comment getCommentById(@Argument String id) {
        return commentService.getCommentById(id);
    }

    @QueryMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @QueryMapping
    public List<Comment> getAllCommentsForTicketId(@Argument String id) {
        return commentService.getAllCommentsForTicketId(id);
    }
}
