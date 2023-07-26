package de.fhswf.kanbanql.request.update;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateTagRequest {
    private String id;

    private String tagName;

    private List<UpdateTicketRequest> tickets;
}
