package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    public User getUserByUsername(String username);
}
