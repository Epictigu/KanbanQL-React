package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.request.create.CreateTicketRequest;
import de.fhswf.kanbanql.response.TicketResponse;
import de.fhswf.kanbanql.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GraphQLMutation {

    private final TicketService ticketService;

    @MutationMapping
    public TicketResponse createTicket(@Argument CreateTicketRequest ticket) {
        return new TicketResponse(ticketService.createTicket(ticket));
    }
}
