package de.fhswf.kanbanql.request.create;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import de.fhswf.kanbanql.model.Ticket;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Nonnull;

/**
 * The data transfer object used for the creation of {@link Ticket tickets}.
 */
@Getter
@Setter
@Builder
public class CreateTicketRequest {

    /**
     * The title of the newly created ticket. Needs to be provided, as every ticket needs a title.
     */
    @Nonnull
    private String title;

    /**
     * Optional {@link Status status} of the ticket. If no status is provided, the default {@link Status#BACKLOG} is taken instead.
     */
    private Status status;

    /**
     * Optional {@link Priority priority} of the ticket. If no priority is provided, the default {@link Priority#LOW} is taken instead.
     */
    private Priority priority;
}
