package de.fhswf.kanbanql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main entry point of the KanbanQL application. This application provides various basic features of a kanban board through the usage of
 * GraphQL-Endpoints. A user is able to create, edit and delete tickets, as well as manage tags and write comments. Currently, no authentication is
 * provided and no separation of board for multiple project is possible. This is mostly, because the project is meant to be more of a prototype to
 * show the potential of spring and GraphQL in combination.
 */
@SpringBootApplication
public class KanbanQLApplication {

    public static void main(String[] args) {
        SpringApplication.run(KanbanQLApplication.class, args);
    }
}
