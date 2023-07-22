package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.model.Tag;
import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.model.User;
import de.fhswf.kanbanql.response.TicketResponse;
import de.fhswf.kanbanql.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GraphQLQuery {

    @Autowired
    private TicketService ticketService;

    @QueryMapping
    public Ticket getTicketById(@Argument String id){

        return ticketService.getTicketById(id);

    }

    @QueryMapping
    public List<Ticket> getAllTickets() {
        List<User> users = new ArrayList<>();

        User user1 = new User();
        user1.setUsername("kemal");

        users.add(user1);


        ticketService.createUser(users);
        return ticketService.getAllTickets();
    }

    @QueryMapping
    public Tag getTagById(@Argument String id){
        return ticketService.getTagById(id);
    }

    @QueryMapping
    public List<Tag> getAllTags(){
        return ticketService.getAllTags();
    }

    @QueryMapping
    public Comment getCommentById(@Argument String id){
        return ticketService.getCommentById(id);
    }

    @QueryMapping
    public List<Comment> getAllComments(){
        return ticketService.getAllComments();
    }

    @QueryMapping
    public List<User> getAllUsers(){
        return ticketService.getAllUsers();
    }



}
