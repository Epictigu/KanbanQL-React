describe("ticketboard", () => {
    it("opens the priority menu", () => {
        cy.visit("http://localhost:5173");
        cy.get(".selector-icon").first().click();
        cy.get(".priority-selector-overlay").should("exist");
    });

    it("updates the priority", () => {
        cy.visit("http://localhost:5173");
        cy.get(".selector-icon").first().click();
        cy.get(".priority-selector-line").contains("Mittlere Priorität").click()
        cy.get(".selector-icon").first().and("have.css", "color").should("equal", "rgb(65, 184, 223)");
        cy.get(".selector-icon").first().click();
        cy.get(".priority-selector-line").contains("Hohe Priorität").click()
        cy.get(".selector-icon").first().and("have.css", "color").should("equal", "rgb(255, 165, 0)");
    });

    it("opens the tag menu", () => {
        cy.visit("http://localhost:5173");
        cy.get(".tag-edit").first().click();
        cy.get(".tag-selector-overlay").should("exist");
    });

    it("opens the ticket view", () => {
        cy.visit("http://localhost:5173");
        cy.get(".ticket-card").first().click().click();
        cy.get(".ticket-view").should("exist");
    });

    it("contains all status lanes", () => {
        cy.visit("http://localhost:5173");
        cy.get(".ticket-lane").children(".lane-title").contains("Backlog");
        cy.get(".ticket-lane").children(".lane-title").contains("Geplant");
        cy.get(".ticket-lane").children(".lane-title").contains("In Arbeit");
        cy.get(".ticket-lane").children(".lane-title").contains("In Review");
        cy.get(".ticket-lane").children(".lane-title").contains("Abgeschlossen");
    })
});