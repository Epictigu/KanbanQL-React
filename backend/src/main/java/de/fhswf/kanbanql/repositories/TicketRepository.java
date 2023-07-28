package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The repository used to create, manipulate and fetch {@link Ticket ticket} data.
 */
public interface TicketRepository extends JpaRepository<Ticket, String> {
}
