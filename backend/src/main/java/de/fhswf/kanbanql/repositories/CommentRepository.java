package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}
