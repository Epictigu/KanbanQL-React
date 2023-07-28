package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.repositories.TagRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.request.create.CreateTagRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * The service class providing various CRUD methods for the {@link Tag tag} data.
 */
@ParametersAreNonnullByDefault
@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final TicketRepository ticketRepository;

    /**
     * Fetches all {@link Tag tags} from the database and provides them in a list.
     *
     * @return all persisted tags
     */
    @Nonnull
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    /**
     * Fetches a single {@link Tag tag} for the given id, if any are defined with that id.
     *
     * @param id the id for the tag
     * @return the {@link Tag tag} with the given id if it exists, otherwise null
     */
    @Nullable
    public Tag getTagById(String id) {
        return tagRepository.findById(id)
                .orElse(null);
    }

    /**
     * Creates a new {@link Tag tag} based on the input given in the form a {@link CreateTagRequest} dto.
     *
     * @param tagRequest the dto containing the data for the new {@link Tag tag}
     * @return the newly created {@link Tag tag}
     */
    @Nonnull
    public Tag createTag(CreateTagRequest tagRequest) {
        Tag tag = new Tag();
        tag.setTagName(tagRequest.getTagName());
        return tagRepository.save(tag);
    }

    /**
     * Deletes an existing {@link Tag tag} for the given id. As all tickets containing this tag need to delete the tag from their list of tags as
     * well, their tag lists are changed and persisted at the same time. To improve performance, the different transactions are performed together,
     * through the {@link Transactional} annotation.
     *
     * @param id the id for the tag that is to be deleted
     * @return the deleted tag if a tag with that id existed, otherwise null
     */
    @Transactional
    @Nullable
    public Tag deleteTag(String id) {
        Tag tag = tagRepository.findById(id).orElse(null);
        if (tag == null) {
            return null;
        }

        Set<Ticket> tickets = tag.getTickets();
        tickets.forEach(ticket -> deleteTagFromTicket(ticket, id));
        ticketRepository.saveAll(tickets);

        tagRepository.delete(tag);
        return tag;
    }

    private void deleteTagFromTicket(Ticket ticket, String tagId) {
        Set<Tag> tags = ticket.getTags().stream()
                .filter(tag -> !tag.getId().equals(tagId))
                .collect(Collectors.toSet());
        ticket.setTags(tags);
    }
}
