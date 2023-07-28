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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    private static final String TAG_ID = "tag/1";
    private static final String TICKET_ID = "ticket/1";
    private static final String TICKET_TITLE = "Titel";
    private static final String TICKET_DESCRIPTION = "Description";
    private static final Status TICKET_STATUS = Status.IN_PROGRESS;
    private static final Priority TICKET_PRIORITY = Priority.MEDIUM;

    private final Ticket ticket = mock(Ticket.class);

    private final Tag tag = mock(Tag.class);

    private final UpdateTagRequest updateTagRequest = UpdateTagRequest.builder()
            .id(TAG_ID)
            .build();

    private final CreateTicketRequest ticketCreateRequest = CreateTicketRequest.builder()
            .title(TICKET_TITLE)
            .status(TICKET_STATUS)
            .priority(TICKET_PRIORITY)
            .build();

    private final UpdateTicketRequest updateTicketRequest = UpdateTicketRequest.builder()
            .id(TICKET_ID)
            .title(TICKET_TITLE)
            .description(TICKET_DESCRIPTION)
            .status(TICKET_STATUS)
            .priority(TICKET_PRIORITY)
            .tags(null)
            .build();

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TicketService cut;

    @Test
    void testGetTicketById_givenTicket_shouldReturnTicket() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        Ticket result = cut.getTicketById(TICKET_ID);
        assertEquals(ticket, result);
    }

    @Test
    void testGetTicketById_givenNoTicket_shouldReturnNull() {
        Ticket result = cut.getTicketById(TICKET_ID);
        assertNull(result);
    }

    @Test
    void testGetAllTickets_shouldReturnAllTickets() {
        when(ticketRepository.findAll()).thenReturn(List.of(ticket));
        List<Ticket> result = cut.getAllTickets();
        assertEquals(List.of(ticket), result);
    }

    @Test
    void testCreateTicket_shouldSaveNewTicket() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        cut.createTicket(ticketCreateRequest);
        verify(ticketRepository).save(any(Ticket.class));
    }

    @Test
    void testCreateTicket_shouldSetTitle() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(TICKET_TITLE, newTicket.getTitle());
    }

    @Test
    void testCreateTicket_givenStatus_shouldSetStatus() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(TICKET_STATUS, newTicket.getStatus());
    }

    @Test
    void testCreateTicket_givenNoStatus_shouldSetDefaultStatus() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        ticketCreateRequest.setStatus(null);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(TicketService.DEFAULT_STATUS, newTicket.getStatus());
    }


    @Test
    void testCreateTicket_givenPriority_shouldSetPriority() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(TICKET_PRIORITY, newTicket.getPriority());
    }

    @Test
    void testCreateTicket_givenNoPriority_shouldSetDefaultPriority() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        ticketCreateRequest.setPriority(null);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(TicketService.DEFAULT_PRIORITY, newTicket.getPriority());
    }

    @Test
    void testCreateTicket_shouldSetEmptyTags() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(new HashSet<>(), newTicket.getTags());
    }

    @Test
    void testCreateTicket_shouldSetEmptyComments() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Ticket newTicket = cut.createTicket(ticketCreateRequest);
        assertEquals(new ArrayList<>(), newTicket.getComments());
    }

    @Test
    void testCreateTicket_shouldSetCurrentDate() {
        when(ticketRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);

        try (MockedConstruction<Date> mock = mockConstruction(Date.class)) {
            Ticket newTicket = cut.createTicket(ticketCreateRequest);
            assertEquals(newTicket.getCreationDate(), mock.constructed().get(0));
        }
    }

    @Test
    void testUpdateTicket_givenNoTicket_shouldNotSaveAnything() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.empty());
        cut.updateTicket(updateTicketRequest);
        verify(ticketRepository, never()).save(any());
    }

    @Test
    void testUpdateTicket_givenNoTicket_shouldReturnNull() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.empty());
        Ticket result = cut.updateTicket(updateTicketRequest);
        assertNull(result);
    }

    @Test
    void testUpdateTicket_givenTicket_shouldSaveTicket() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticketRepository).save(ticket);
    }

    @Test
    void testUpdateTicket_givenTicket_shouldReturnTicket() {
        when(ticketRepository.save(ticket)).thenReturn(ticket);
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        Ticket result = cut.updateTicket(updateTicketRequest);
        assertEquals(ticket, result);
    }

    @Test
    void testUpdateTicket_givenTicket_givenTitle_shouldSetTitle() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setTitle(TICKET_TITLE);
    }

    @Test
    void testUpdateTicket_givenTicket_givenNoTitle_shouldNotSetTitle() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        updateTicketRequest.setTitle(null);
        cut.updateTicket(updateTicketRequest);
        verify(ticket, never()).setTitle(any());
    }

    @Test
    void testUpdateTicket_givenTicket_givenDescription_shouldSetDescription() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setDescription(TICKET_DESCRIPTION);
    }

    @Test
    void testUpdateTicket_givenTicket_givenNoDescription_shouldNotSetDescription() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        updateTicketRequest.setDescription(null);
        cut.updateTicket(updateTicketRequest);
        verify(ticket, never()).setDescription(any());
    }

    @Test
    void testUpdateTicket_givenTicket_givenStatus_shouldSetStatus() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setStatus(TICKET_STATUS);
    }

    @Test
    void testUpdateTicket_givenTicket_givenNoStatus_shouldNotSetStatus() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        updateTicketRequest.setStatus(null);
        cut.updateTicket(updateTicketRequest);
        verify(ticket, never()).setStatus(any());
    }

    @Test
    void testUpdateTicket_givenTicket_givenPriority_shouldSetPriority() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setPriority(TICKET_PRIORITY);
    }

    @Test
    void testUpdateTicket_givenTicket_givenNoPriority_shouldNotSetPriority() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        updateTicketRequest.setPriority(null);
        cut.updateTicket(updateTicketRequest);
        verify(ticket, never()).setPriority(any());
    }

    @Test
    void testUpdateTicket_givenTicket_givenTags_shouldSetTags() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(tag));
        updateTicketRequest.setTags(List.of(updateTagRequest));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setTags(Set.of(tag));
    }

    @Test
    void testUpdateTicket_givenTicket_givenInvalidTags_shouldSetEmptyTags() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.empty());
        updateTicketRequest.setTags(List.of(updateTagRequest));
        cut.updateTicket(updateTicketRequest);
        verify(ticket).setTags(new HashSet<>());
    }

    @Test
    void testUpdateTicket_givenTicket_givenNoTags_shouldNotSetTags() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.updateTicket(updateTicketRequest);
        verify(ticket, never()).setTags(any());
    }

    @Test
    void testDeleteTicket_givenNoTicket_shouldNotDeleteAnything() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.empty());
        cut.deleteTicket(TICKET_ID);
        verify(ticketRepository, never()).delete(any());
    }

    @Test
    void testDeleteTicket_givenNoTicket_shouldReturnNull() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.empty());
        Ticket result = cut.deleteTicket(TICKET_ID);
        assertNull(result);
    }

    @Test
    void testDeleteTicket_givenTicket_shouldDeleteTicket() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        cut.deleteTicket(TICKET_ID);
        verify(ticketRepository).delete(ticket);
    }

    @Test
    void testDeleteTicket_givenTicket_shouldReturnDeletedTicket() {
        when(ticketRepository.findById(TICKET_ID)).thenReturn(Optional.of(ticket));
        Ticket deletedTicket = cut.deleteTicket(TICKET_ID);
        assertEquals(ticket, deletedTicket);
    }
}