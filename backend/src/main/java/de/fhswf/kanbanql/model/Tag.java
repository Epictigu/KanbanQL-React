package de.fhswf.kanbanql.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    private String tagName;

    @ManyToMany(mappedBy = "tags")
    private Set<Ticket> tickets;

    @PreRemove
    private void removeTicketAssociations() {
        for (Ticket ticket: this.tickets) {
            ticket.getTags().remove(this);
        }
    }
}
