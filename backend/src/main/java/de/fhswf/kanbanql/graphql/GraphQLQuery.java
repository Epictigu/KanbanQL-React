package de.fhswf.kanbanql.graphql;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GraphQLQuery {

    @QueryMapping
    public String firstQuery() {
        return "First Query";
    }
}
