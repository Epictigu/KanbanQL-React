package de.fhswf.kanbanql.request.create;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentRequest {

    private String commentText;

    private String ticketId;
}
