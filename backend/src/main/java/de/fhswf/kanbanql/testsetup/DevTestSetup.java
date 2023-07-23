package de.fhswf.kanbanql.testsetup;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.CommentRepository;
import de.fhswf.kanbanql.repositories.TagRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Transactional
@Component
@ConditionalOnProperty(name = "kanban-ql.setup", havingValue = "dev")
@RequiredArgsConstructor
public class DevTestSetup {

    private final TagRepository tagRepository;
    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;

    private Tag frontendTag;
    private Tag backendTag;

    @PostConstruct
    public void init() {
        createTestTags();
        createTestTickets();
    }

    private void createTestTags() {
        frontendTag = createTag("Frontend");
        backendTag = createTag("Backend");

        frontendTag = tagRepository.save(frontendTag);
        backendTag = tagRepository.save(backendTag);
    }

    private Tag createTag(String tagName) {
        Tag tag = new Tag();
        tag.setTagName(tagName);
        return tag;
    }

    private void createTestTickets() {
        Ticket boardTicket = createTicket("Board-Frontend erstellen",
                "Hiermit soll das Frontend für das Board erstellt werden.",
                Priority.MEDIUM,
                Status.DONE,
                createDate(2020, 10, 2, 14, 15),
                frontendTag);
        ticketRepository.save(boardTicket);

        Ticket queryTicket = createTicket("Queries umsetzen",
                "",
                Priority.CRITICAL,
                Status.IN_PROGRESS,
                createDate(2020, 10, 5, 20, 10),
                backendTag, frontendTag);
        ticketRepository.save(queryTicket);

        Ticket mutationsTicket = createTicket("Mutations umsetzen",
                "Nach den Queries sollen auch die Mutations umgesetzt werden.",
                Priority.LOW,
                Status.BACKLOG,
                createDate(2021, 1, 14, 12, 0),
                backendTag);
        ticketRepository.save(mutationsTicket);
    }

    private Ticket createTicket(String title,
                                String description,
                                Priority priority,
                                Status status,
                                Date date,
                                Tag... tags) {
        Ticket ticket = new Ticket();

        ticket.setTitle(title);
        ticket.setDescription(description);
        ticket.setPriority(priority);
        ticket.setStatus(status);
        ticket.setCreationDate(date);
        ticket.setTags(Set.of(tags));

        return ticket;
    }

    private Date createDate(int year, int month, int day, int hour, int minute) {
        return Timestamp.valueOf(LocalDateTime.of(year, month, day, hour, minute));
    }
}
