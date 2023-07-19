package de.fhswf.kanbanql.repositories;

import de.fhswf.kanbanql.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, String> {

}
