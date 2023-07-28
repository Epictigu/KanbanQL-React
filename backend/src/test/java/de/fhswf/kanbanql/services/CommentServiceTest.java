package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.CommentRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateCommentRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    private static final String COMMENT_ID = "comment/1";
    private static final String COMMENT_TEXT = "CommentText";
    private static final String TICKET_ID = "ticket/1";

    private final Ticket ticket = mock(Ticket.class);

    private final Comment firstComment = mock(Comment.class);
    private final Comment secondComment = mock(Comment.class);

    private final CreateCommentRequest createCommentRequest = CreateCommentRequest.builder()
            .commentText(COMMENT_TEXT)
            .ticketId(TICKET_ID)
            .build();

    @Mock
    TicketRepository ticketRepository;

    @Mock
    CommentRepository commentRepository;

    @InjectMocks
    CommentService cut;

    @Test
    void testCreateComment_shouldSaveNewComment() {
        cut.createComment(createCommentRequest);
        verify(commentRepository).save(any(Comment.class));
    }

    @Test
    void testCreateComment_shouldSetCommentText() {
        when(commentRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Comment comment = cut.createComment(createCommentRequest);
        assertEquals(COMMENT_TEXT, comment.getCommentText());
    }

    @Test
    void testCreateComment_shouldSetCurrentDate() {
        when(commentRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        try (MockedConstruction<Date> mock = mockConstruction(Date.class)) {
            Comment comment = cut.createComment(createCommentRequest);
            assertEquals(comment.getCreationDate(), mock.constructed().get(0));
        }
    }

    @Test
    void testCreateComment_shouldSetTicket() {
        when(commentRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        when(ticketRepository.getReferenceById(TICKET_ID)).thenReturn(ticket);
        Comment comment = cut.createComment(createCommentRequest);
        assertEquals(ticket, comment.getTicket());
    }

    @Test
    void testGetAllComments_shouldFindAll() {
        when(commentRepository.findAll()).thenReturn(List.of(firstComment, secondComment));
        List<Comment> allComments = cut.getAllComments();
        assertEquals(allComments, List.of(firstComment, secondComment));
    }

    @Test
    void testGetCommentById_givenFoundComment_shouldReturnFoundComment() {
        when(commentRepository.findById(COMMENT_ID)).thenReturn(Optional.of(firstComment));
        Comment comment = cut.getCommentById(COMMENT_ID);
        assertEquals(comment, firstComment);
    }

    @Test
    void testGetCommentById_givenNoFoundComment_shouldReturnNull() {
        when(commentRepository.findById(COMMENT_ID)).thenReturn(Optional.empty());
        Comment comment = cut.getCommentById(COMMENT_ID);
        assertNull(comment);
    }

    @Test
    void testGetAllCommentForTicketId_shouldFindCommentsByTicketId() {
        when(commentRepository.findByTicket_Id(TICKET_ID)).thenReturn(List.of(secondComment));
        List<Comment> comments = cut.getAllCommentsForTicketId(TICKET_ID);
        assertEquals(comments, List.of(secondComment));
    }
}