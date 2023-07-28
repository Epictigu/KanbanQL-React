package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Priority;
import de.fhswf.kanbanql.model.Status;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.TagRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateTicketRequest;
import de.fhswf.kanbanql.request.update.UpdateTagRequest;
import de.fhswf.kanbanql.request.update.UpdateTicketRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.annotation.ParametersAreNonnullByDefault;
import java.util.*;
import java.util.stream.Collectors;

/**
 * The service class providing various CRUD methods for the {@link Ticket ticket} data.
 */
@ParametersAreNonnullByDefault
@Service
@RequiredArgsConstructor
public class TicketService {

    static final Status DEFAULT_STATUS = Status.BACKLOG;
    static final Priority DEFAULT_PRIORITY = Priority.LOW;

    private final TicketRepository ticketRepository;
    private final TagRepository tagRepository;

    /**
     * Fetches all {@link Ticket tickets} from the database and provides them in a list.
     *
     * @return all persisted tickets
     */
    @Nonnull
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    /**
     * Fetches a single {@link Ticket ticket} for the given id, if any are defined with that id.
     *
     * @param id the id for the ticket
     * @return the {@link Ticket ticket} with the given id if it exists, otherwise null
     */
    @Nullable
    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElse(null);
    }

    /**
     * Creates a new {@link Ticket ticket} based on the input given in the form a {@link CreateTicketRequest} dto. Optionally, the query can also
     * provide a status and priority inside the data transfer object, which are otherwise set to the default values {@link #DEFAULT_STATUS} and
     * {@link #DEFAULT_PRIORITY}.
     *
     * @param ticketRequest the dto containing the data for the new {@link Ticket ticket}
     * @return the newly created {@link Ticket ticket}
     */
    @Nonnull
    public Ticket createTicket(@Nonnull CreateTicketRequest ticketRequest) {
        Ticket ticket = new Ticket();

        ticket.setTitle(ticketRequest.getTitle());
        ticket.setStatus(determineStatus(ticketRequest));
        ticket.setPriority(determinePriority(ticketRequest));
        ticket.setTags(new HashSet<>());
        ticket.setComments(new ArrayList<>());
        ticket.setCreationDate(new Date());

        return ticketRepository.save(ticket);
    }

    private Status determineStatus(CreateTicketRequest ticketRequest) {
        return Optional.ofNullable(ticketRequest.getStatus())
                .orElse(DEFAULT_STATUS);
    }

    private Priority determinePriority(CreateTicketRequest ticketRequest) {
        return Optional.ofNullable(ticketRequest.getPriority())
                .orElse(DEFAULT_PRIORITY);
    }

    /**
     * Updates a {@link Ticket ticket} with the data in the given {@link UpdateTicketRequest} dto. The ticket that should be updated is taken directly from the id
     * field inside the data transfer object. The query can provide a free selection of parameters inside the dto and only the existing ones are
     * actually set inside the ticket.
     *
     * @param ticketRequest the dto containing the data that should be updated
     * @return the updated ticket, if any were found with the given id, otherwise null
     */
    @Nullable
    public Ticket updateTicket(UpdateTicketRequest ticketRequest) {
        Ticket ticket = ticketRepository.findById(ticketRequest.getId())
                .orElse(null);
        if (ticket == null) {
            return null;
        }

        Optional.ofNullable(ticketRequest.getTitle())
                .ifPresent(ticket::setTitle);
        Optional.ofNullable(ticketRequest.getDescription())
                .ifPresent(ticket::setDescription);
        Optional.ofNullable(ticketRequest.getStatus())
                .ifPresent(ticket::setStatus);
        Optional.ofNullable(ticketRequest.getPriority())
                .ifPresent(ticket::setPriority);
        Optional.ofNullable(ticketRequest.getTags())
                .map(this::convertUpdateTagRequestsToTags)
                .ifPresent(ticket::setTags);

        return ticketRepository.save(ticket);
    }

    private Set<Tag> convertUpdateTagRequestsToTags(List<UpdateTagRequest> tagRequests) {
        return tagRequests.stream()
                .map(tag -> tagRepository.findById(tag.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }

    /**
     * Deletes an existing {@link Ticket ticket} for the given id.
     *
     * @param id the id for the ticket that is to be deleted
     * @return the deleted tag if a ticket with that id existed, otherwise null
     */
    @Nullable
    public Ticket deleteTicket(String id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            return null;
        }

        ticketRepository.delete(ticket);
        return ticket;
    }
}
