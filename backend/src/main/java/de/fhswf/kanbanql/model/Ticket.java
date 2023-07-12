package de.fhswf.kanbanql.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    private String id;
    private User assignee;
    private String title;
    private String description;
    private Status status = Status.BACKLOG;
    private Priority priority;
    private List<String> tags;
    private String comment;
    private Date creationDate = new Date();


}
