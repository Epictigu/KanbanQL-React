package de.fhswf.kanbanql.request.update;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import de.fhswf.kanbanql.model.Ticket;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Nonnull;
import java.util.List;

/**
 * The data transfer object used for updating {@link Ticket tickets}.
 */
@Getter
@Setter
@Builder
public class UpdateTicketRequest {

    /**
     * The only required field, as it is needed to find the ticket which should be updated.
     */
    @Nonnull
    private String id;

    /**
     * The optional title that the found ticket should be set for.
     */
    private String title;

    /**
     * The optional description that the found ticket should be set for.
     */
    private String description;

    /**
     * The optional {@link Status status} that the found ticket should be set for.
     */
    private Status status;

    /**
     * The optional {@link Priority priority} that the found ticket should be set for.
     */
    private Priority priority;

    /**
     * The optional tags that the found ticket should be set for. Leaving a tag out of the list that was previously in it, deletes it from the tag
     * list. An empty list clears all tags of the ticket.
     */
    private List<UpdateTagRequest> tags;
}
