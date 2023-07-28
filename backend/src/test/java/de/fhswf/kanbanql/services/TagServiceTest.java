package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.TagRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateTagRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    private static final String TAG_ID = "tag/1";
    private static final String TAG_NAME = "TagName";

    private final CreateTagRequest createTagRequest = CreateTagRequest.builder()
            .tagName(TAG_NAME)
            .build();

    private final Tag firstTag = mock(Tag.class);
    private final Tag secondTag = mock(Tag.class);

    private final Ticket ticket = mock(Ticket.class);

    @Mock
    private TagRepository tagRepository;

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TagService cut;

    @Test
    void testGetTagById_givenNoTag_shouldReturnNull() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.empty());
        assertNull(cut.getTagById(TAG_ID));
    }

    @Test
    void testGetTagById_givenTag_shouldReturnTag() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(firstTag));
        assertEquals(firstTag, cut.getTagById(TAG_ID));
    }

    @Test
    void testGetAllTags_shouldReturnAllTags() {
        when(tagRepository.findAll()).thenReturn(List.of(firstTag, secondTag));
        assertEquals(List.of(firstTag, secondTag), cut.getAllTags());
    }

    @Test
    void testCreateTag_shouldSaveNewTag() {
        cut.createTag(createTagRequest);
        verify(tagRepository).save(any(Tag.class));
    }

    @Test
    void testCreateTag_shouldSetTagName() {
        when(tagRepository.save(any())).thenAnswer(invocation -> invocation.getArguments()[0]);
        Tag tag = cut.createTag(createTagRequest);
        assertEquals(TAG_NAME, tag.getTagName());
    }

    @Test
    void testDeleteTag_givenNoTag_shouldNotDeleteAnything() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.empty());
        cut.deleteTag(TAG_ID);
        verify(tagRepository, never()).delete(any());
    }

    @Test
    void testDeleteTag_givenNoTag_shouldReturnNull() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.empty());
        assertNull(cut.deleteTag(TAG_ID));
    }

    @Test
    void testDeleteTag_givenTag_shouldReturnTag() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(firstTag));
        Tag result = cut.deleteTag(TAG_ID);
        assertEquals(firstTag, result);
    }

    @Test
    void testDeleteTag_givenTag_shouldDeleteTag() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(firstTag));
        cut.deleteTag(TAG_ID);
        verify(tagRepository).delete(firstTag);
    }

    @Test
    void testDeleteTag_givenTag_givenTickets_shouldSaveTickets() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(firstTag));
        when(firstTag.getId()).thenReturn(TAG_ID);
        when(firstTag.getTickets()).thenReturn(Set.of(ticket));
        when(ticket.getTags()).thenReturn(Set.of(firstTag));

        cut.deleteTag(TAG_ID);
        verify(ticketRepository).saveAll(Set.of(ticket));
    }

    @Test
    void testDeleteTag_givenTag_givenTickets_shouldSetTagsForTickets() {
        when(tagRepository.findById(TAG_ID)).thenReturn(Optional.of(firstTag));
        when(firstTag.getId()).thenReturn(TAG_ID);
        when(firstTag.getTickets()).thenReturn(Set.of(ticket));
        when(ticket.getTags()).thenReturn(Set.of(firstTag));

        cut.deleteTag(TAG_ID);
        verify(ticket).setTags(Set.of());
    }
}