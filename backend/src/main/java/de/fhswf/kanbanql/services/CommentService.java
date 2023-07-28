package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.CommentRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateCommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Date;
import java.util.List;

/**
 * The service class providing various CRUD methods for the {@link Comment comment} data.
 */
@ParametersAreNonnullByDefault
@Service
@RequiredArgsConstructor
public class CommentService {

    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;

    /**
     * Fetches all {@link Comment comments} from the database and provides them in a list.
     *
     * @return all persisted comments
     */
    @Nonnull
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    /**
     * Fetches a single {@link Comment comment} for the given id, if any are defined with that id.
     *
     * @param id the id for the comment
     * @return the {@link Comment comment} with the given id if it exists, otherwise null
     */
    @Nullable
    public Comment getCommentById(String id) {
        return commentRepository.findById(id)
                .orElse(null);
    }

    /**
     * Fetches all {@link Comment comments} which are defined for the {@link Ticket ticket} with the given id.
     *
     * @param ticketId the id of the ticket that the comments are defined for
     * @return all {@link Comment comments} for the ticket with the defined id
     */
    @Nonnull
    public List<Comment> getAllCommentsForTicketId(String ticketId) {
        return commentRepository.findByTicket_Id(ticketId);
    }

    /**
     * Creates a new {@link Comment comment} based on the input given in the form a {@link CreateCommentRequest} dto.
     *
     * @param commentRequest the dto containing the data for the new {@link Comment comment}
     * @return the newly created {@link Comment comment}
     */
    @Nonnull
    public Comment createComment(CreateCommentRequest commentRequest) {
        Comment comment = new Comment();

        comment.setCommentText(commentRequest.getCommentText());
        comment.setCreationDate(new Date());
        comment.setTicket(ticketRepository.getReferenceById(commentRequest.getTicketId()));

        return commentRepository.save(comment);
    }
}
