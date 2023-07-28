package de.fhswf.kanbanql.request.create;

import de.fhswf.kanbanql.model.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Nonnull;

/**
 * The data transfer object used for the creation of {@link Comment comments}.
 */
@Getter
@Setter
@Builder
public class CreateCommentRequest {

    /**
     * The actual text of the comment that the user has given through an input field.
     */
    @Nonnull
    private String commentText;

    /**
     * The id of the ticket that the comment is to be created for.
     */
    @Nonnull
    private String ticketId;
}
