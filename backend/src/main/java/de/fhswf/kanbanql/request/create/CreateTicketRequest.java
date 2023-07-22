package de.fhswf.kanbanql.request.create;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateTicketRequest {

    private String userId;

    private String title;

    private Status status;

    private Priority priority;



}
