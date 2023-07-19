package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Ticket;
import de.fhswf.kanbanql.response.TicketResponse;
import de.fhswf.kanbanql.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class GraphQLQuery {

    @Autowired
    private TicketService ticketService;

    @QueryMapping
    public String firstQuery() {
        return "First Query";
    }

    @QueryMapping
    public TicketResponse getTicketById(@Argument String id){

        Ticket ticket = ticketService.getTicketById(id);
        return new TicketResponse(ticket);
    }


    @QueryMapping
    public List<TicketResponse> getAllTickets(){

        return ticketService.getAllTickets().stream().
                map(TicketResponse::new).toList();
    }
}
