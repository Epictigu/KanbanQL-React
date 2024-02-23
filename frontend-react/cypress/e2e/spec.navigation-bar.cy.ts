describe("navigation bar", () => {
    it("adds the icon", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".app-icon").should("exist");
    });

    it("adds the title", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".app-title").should("exist");
        cy.get(".navigation-bar").children(".app-title").contains("KanbanQL").should("exist");
    });

    it("adds the add ticket button", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".btn").contains("Ticket hinzufügen").should("exist");
    });

    it("adds the edit tags button", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".btn").contains("Tags bearbeiten").should("exist");
    });

    it("opens the ticket add modal", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".btn").contains("Ticket hinzufügen").click();
        cy.get(".modal-title").contains("Neues Ticket erstellen").should("exist");
    });

    it("opens and closes the ticket add modal", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".btn").contains("Ticket hinzufügen").click();
        cy.get(".modal-footer").contains("Abbrechen").click();
        cy.get(".modal-container").should("not.exist");
    });

    it("saves and creates a new ticket", () => {
        cy.visit("http://localhost:5173");
        cy.get(".navigation-bar").children(".btn").contains("Ticket hinzufügen").click();
        cy.get("#newTicketName").type("Cypress Test");
        cy.get(".modal-footer").contains("Hinzufügen").click();
        cy.get(".modal-container").should("not.exist");
        cy.get(".ticket-name").contains("Cypress Test").should("exist");
    });
});