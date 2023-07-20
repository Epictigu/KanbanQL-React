package de.fhswf.kanbanql.response;

import de.fhswf.kanbanql.model.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Getter
@Setter
public class TicketResponse {

    private String id;

    private String username;

    private String title;

    private String description;

    private Status status;

    private Priority priority;

    private List<TagResponse> tags;

    private List<CommentResponse> comments;

    private LocalDateTime creationDate;


    public TicketResponse(Ticket ticket) {
        this.id = ticket.getId();
        this.username = Optional.ofNullable(ticket.getUser())
                .map(User::getUsername)
                .orElse("Kein Nutzer");
        this.title = ticket.getTitle();
        this.description = ticket.getDescription();
        this.status = ticket.getStatus();
        this.priority = ticket.getPriority();

        this.tags = new ArrayList<>();

        for (Tag tag :
                ticket.getTags()) {

            this.tags.add(new TagResponse(tag));
        }

        this.comments = new ArrayList<>();
        for (Comment comment:
                ticket.getComments()) {

            this.comments.add(new CommentResponse(comment));
        }

        this.creationDate = ticket.getCreationDate();

    }
}
