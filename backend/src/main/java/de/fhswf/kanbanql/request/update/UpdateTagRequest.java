package de.fhswf.kanbanql.request.update;

import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Nonnull;

/**
 * The data transfer object used for adding {@link Tag tags} to a {@link Ticket ticket}. As the frontend is easier able to provide data of
 * tags in the form of JsonObjects, instead of converting the list of tags to a list of strings, this dto is provided to enable an easier way for the
 * communication between frontend and backend. If the frontend would instead provide a direct list of strings, this dto wouldn't be needed anymore.
 */
@Getter
@Setter
@Builder
public class UpdateTagRequest {

    /**
     * The id of the {@link Tag tag} that should be added to a {@link Ticket ticket}.
     */
    @Nonnull
    private String id;
}
