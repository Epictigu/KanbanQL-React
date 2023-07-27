package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.repositories.CommentRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateCommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;

    private List<Comment> newComments = new ArrayList<>();

    public Comment createComment(CreateCommentRequest commentRequest) {
        Comment comment = new Comment();

        comment.setCommentText(commentRequest.getCommentText());
        comment.setCreationDate(new Date());
        if (commentRequest.getTicketId() != null) {
            comment.setTicket(ticketRepository.getReferenceById(commentRequest.getTicketId()));
        }

        newComments.add(comment);
        return commentRepository.save(comment);
    }

    public List<Comment> flushNewComments() {
        List<Comment> flushedComments = newComments;
        newComments = new ArrayList<>();
        return flushedComments;
    }
}
