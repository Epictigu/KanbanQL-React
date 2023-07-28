package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * The repository used to create, manipulate and fetch {@link Comment comment} data.
 */
public interface CommentRepository extends JpaRepository<Comment, String> {

    List<Comment> findByTicket_Id(@Param("ticket_Id") String ticketId);
}
