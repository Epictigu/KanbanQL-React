package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The repository used to create, manipulate and fetch {@link Tag tag} data.
 */
public interface TagRepository extends JpaRepository<Tag, String> {
}
