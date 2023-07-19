package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, String> {
}
