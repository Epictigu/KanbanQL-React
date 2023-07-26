package de.fhswf.kanbanql.request.update;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateCommentRequest {

    private String id;
    private String commentText;
    private UpdateTicketRequest ticket;
}
