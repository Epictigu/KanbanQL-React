# KanbanQL

This application provides a basic Kanban Board with the help of Java Spring and Vue. This is meant to showcase the
features of GraphQL together with the provided api from Java Spring and basic frontend tools from Vue.

To run this app in development, just run the "runBackend" task. This starts the backend together with a H2 In-Memory database.
To start the frontend additionally, under Windows a batch file ("runFrontend.bat") is provided to run and install the frontend,
while other systems need to run the npm server located inside of the "frontend" folder manually.

For building a gradle task called "buildFullProject" is defined, which packages the two parts into a single .jar file.
This instead needs to run on a local MySQL database, which expects various environment variables:

* KANBANQL_SQL_HOSTNAME = Hostname der SQL-Datenbank
* KANBANQL_SQL_PORT = Port der SQL-Datenbank
* KANBANQL_SQL_DATABASE = Name der Datenbank
* KANBANQL_SQL_USERNAME = Nutzername der SQL-Datenbank
* KANBANQL_SQL_PASSWORD = Passwort der SQL-Datenbank