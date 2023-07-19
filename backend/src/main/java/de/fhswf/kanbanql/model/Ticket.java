package de.fhswf.kanbanql.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue
    private String id;

    @ManyToOne
    @JoinColumn(name = "kanban_user_id")
    private User user;

    private String title;

    private String description;

    private Status status;

    private Priority priority;

    @ManyToMany
    @JoinTable(name = "ticket_tags", joinColumns = @JoinColumn(name = "ticket_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags;

    @OneToMany(mappedBy = "ticket")
    private List<Comment> comments;

    private LocalDateTime creationDate;



}
