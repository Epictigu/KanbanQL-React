package de.fhswf.kanbanql.request.create;

import de.fhswf.kanbanql.model.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Nonnull;

/**
 * The data transfer object used for the creation of {@link Tag tags}.
 */
@Getter
@Setter
@Builder
public class CreateTagRequest {

    /**
     * The name of the tag that is to be used as its label.
     */
    @Nonnull
    private String tagName;
}
