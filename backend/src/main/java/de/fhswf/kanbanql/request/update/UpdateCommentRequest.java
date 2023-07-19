package de.fhswf.kanbanql.request.update;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateCommentRequest {

    private String id;

    private String commentText;

    private LocalDateTime creationDate;

    private UpdateTicketRequest ticket;
}
