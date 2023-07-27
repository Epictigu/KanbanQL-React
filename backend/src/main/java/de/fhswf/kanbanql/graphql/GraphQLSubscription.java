package de.fhswf.kanbanql.graphql;

import de.fhswf.kanbanql.model.Comment;
import de.fhswf.kanbanql.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;
import java.util.stream.Stream;


@RequiredArgsConstructor
@Controller
public class GraphQLSubscription {

    private final TicketService commentService;

    @SubscriptionMapping
    Flux<List<Comment>> comments(){
        return Flux.fromStream(Stream.generate(commentService::getAllComments))
                .delayElements(Duration.ofSeconds(1));
    }
}
