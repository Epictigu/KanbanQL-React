package de.fhswf.kanbanql.request.update;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateTicketRequest {

    private String id;

    private String username;

    private String title;

    private String description;

    private Status status;

    private Priority priority;

    private List<UpdateTagRequest> tags;

    private List<UpdateCommentRequest> comments;
}
