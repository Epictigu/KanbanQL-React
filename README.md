*For the original project written with a Vue-Frontend, please visit [https://github.com/Epictigu/KanbanQL](https://github.com/Epictigu/KanbanQL).*

# KanbanQL

*Explanation goes here*

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
