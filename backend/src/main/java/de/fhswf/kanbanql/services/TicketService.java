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
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    private final UserRepository userRepository;

    private final TagRepository tagRepository;

    private final CommentRepository commentRepository;

    private final EntityManager entityManager;

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

        if(ticketRequest.getUserId() != null){
            ticket.setUser(userRepository.getReferenceById(ticketRequest.getUserId()));
        }

        ticket.setTags(new HashSet<>());
        ticket.setComments(new ArrayList<>());
        ticket.setCreationDate(new Date());

        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(UpdateTicketRequest updateTicketRequest){

        Ticket ticket = ticketRepository.getReferenceById(updateTicketRequest.getId());

        if(updateTicketRequest.getUserId() != null){
            ticket.setUser(userRepository.getReferenceById(updateTicketRequest.getUserId()));
        }else{
            ticket.setUser(null);
        }


        ticket.setTitle(updateTicketRequest.getTitle());
        ticket.setDescription(updateTicketRequest.getDescription());
        if(updateTicketRequest.getStatus() != null){
            ticket.setStatus(updateTicketRequest.getStatus());
        }
        if(updateTicketRequest.getPriority() != null){
            ticket.setPriority(updateTicketRequest.getPriority());
        }


        Set<Tag> tags = new HashSet<>();
        if(updateTicketRequest.getTags() != null && !updateTicketRequest.getTags().isEmpty()){

            for (UpdateTagRequest tagRequest:
                    updateTicketRequest.getTags()) {
                tags.add(tagRepository.getReferenceById(tagRequest.getId()));
            }

        }
        ticket.setTags(tags);
        return ticketRepository.save(ticket);

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

        return tagRepository.save(tag);

    }

    public Tag updateTag(UpdateTagRequest tagRequest){

        Tag tag = new Tag();
        tag.setTagName(tagRequest.getTagName());

//        Set<Ticket> tickets = new HashSet<>();
//        for (UpdateTicketRequest ticketRequest :
//                tagRequest.getTickets()) {
//            tickets.add(ticketRepository.getReferenceById(ticketRequest.getId()));
//        }
//
//        tag.setTickets(tickets);

        return tagRepository.save(tag);

    }


    public Tag deleteTag(String id){

        Tag tag = tagRepository.getReferenceById(id);

        for (Ticket ticket : tag.getTickets()) {
            ticket.getTags().remove(tag);
        }
        entityManager.remove(tag);

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
        comment.setCreationDate(new Date());
        if(commentRequest.getTicketId() != null){
            comment.setTicket(ticketRepository.getReferenceById(commentRequest.getTicketId()));
        }


        return commentRepository.save(comment);
    }

    public Comment updateComment(){
        return new Comment();
    }

    public Comment deleteComment(String id){

        Comment comment = commentRepository.getReferenceById(id);
        commentRepository.delete(comment);

        return comment;
    }

    public void createUser(List<User> users){
        userRepository.saveAll(users);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

}
