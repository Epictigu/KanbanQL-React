package de.fhswf.kanbanql.services;

import de.fhswf.kanbanql.model.*;
import de.fhswf.kanbanql.repositories.CommentRepository;
import de.fhswf.kanbanql.repositories.TagRepository;
import de.fhswf.kanbanql.repositories.TicketRepository;
import de.fhswf.kanbanql.repositories.UserRepository;
import de.fhswf.kanbanql.request.create.CreateCommentRequest;
import de.fhswf.kanbanql.request.create.CreateTagRequest;
import de.fhswf.kanbanql.request.create.CreateTicketRequest;
import de.fhswf.kanbanql.request.update.UpdateCommentRequest;
import de.fhswf.kanbanql.request.update.UpdateTagRequest;
import de.fhswf.kanbanql.request.update.UpdateTicketRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Ticket getTicketById(String id){
        return ticketRepository.getReferenceById(id);
    }

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }


    public Ticket createTicket(@Nonnull CreateTicketRequest ticketRequest) {

        Ticket ticket = new Ticket();
        ticket.setTitle(ticketRequest.getTitle());

        if (ticketRequest.getStatus() == null) {
            ticket.setStatus(Status.BACKLOG);
        } else {
            ticket.setStatus(ticketRequest.getStatus());
        }

        if(ticketRequest.getPriority() == null){
            ticket.setPriority(Priority.LOW);
        } else {
            ticket.setPriority(ticketRequest.getPriority());
        }

        if(ticketRequest.getUsername() != null){
            User user = userRepository.getUserByUsername(ticketRequest.getUsername());
            ticket.setUser(user);
        }

        ticket.setTags(new ArrayList<>());
        ticket.setComments(new ArrayList<>());
        ticket.setCreationDate(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(UpdateTicketRequest updateTicketRequest){

        Ticket ticket = ticketRepository.getReferenceById(updateTicketRequest.getId());

        ticket.setUser(userRepository.getUserByUsername(updateTicketRequest.getUsername()));
        ticket.setTitle(updateTicketRequest.getTitle());
        ticket.setDescription(updateTicketRequest.getDescription());
        ticket.setStatus(updateTicketRequest.getStatus());
        ticket.setPriority(updateTicketRequest.getPriority());

        List<Tag> tags = new ArrayList<>();
        for (UpdateTagRequest tagRequest:
             updateTicketRequest.getTags()) {
            tags.add(tagRepository.getReferenceById(tagRequest.getId()));
        }

        ticket.setTags(tags);

        List<Comment> comments = new ArrayList<>();
        for (UpdateCommentRequest commentRequest:
            updateTicketRequest.getComments()) {
            comments.add(commentRepository.getReferenceById(commentRequest.getId()));
        }

        ticket.setComments(comments);

        ticketRepository.save(ticket);

        return ticket;

    }

    public Ticket deleteTicket(String id){

        Ticket ticket = ticketRepository.getReferenceById(id);

        ticketRepository.delete(ticket);

        return ticket;
    }

    public Tag getTagById(String id){
        return tagRepository.getReferenceById(id);
    }

    public List<Tag> getAllTags(){
        return tagRepository.findAll();
    }

    public Tag createTag(CreateTagRequest tagRequest){

        Tag tag = new Tag();
        tag.setTagName(tagRequest.getTagName());

        tagRepository.save(tag);

        return tag;
    }

    public Tag updateTag(UpdateTagRequest tagRequest){

        Tag tag = new Tag();
        tag.setTagName(tagRequest.getTagName());

        List<Ticket> tickets = new ArrayList<>();
        for (UpdateTicketRequest ticketRequest :
                tagRequest.getTickets()) {
            tickets.add(ticketRepository.getReferenceById(ticketRequest.getId()));
        }

        tag.setTickets(tickets);

        tagRepository.save(tag);

        return tag;
    }

    public Tag deleteTag(String id){

        Tag tag = tagRepository.getReferenceById(id);
        tagRepository.delete(tag);

        return tag;
    }


    public Comment getCommentById(String id){
        return commentRepository.getReferenceById(id);
    }

    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    }

    public Comment createComment(CreateCommentRequest commentRequest){

        Comment comment = new Comment();

        comment.setCommentText(commentRequest.getCommentText());
        comment.setCreationDate(LocalDateTime.now());
        comment.setTicket(ticketRepository.getReferenceById(commentRequest.getTicketId()));
        commentRepository.save(comment);

        return comment;
    }

    public Comment updateComment(){
        return new Comment();
    }

    public Comment deleteComment(String id){

        Comment comment = commentRepository.getReferenceById(id);
        commentRepository.delete(comment);

        return comment;
    }



}
