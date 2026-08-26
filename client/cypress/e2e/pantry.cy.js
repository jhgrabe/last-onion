describe("Pantry", () => {
  const email = `pantry${Date.now()}@test.com`;
  const password = "pass1234";

  before(() => {
    cy.visit("/register");
    cy.get("input[placeholder='Email']").type(email);
    cy.get("input[placeholder='Password']").type(password);
    cy.get("input[placeholder='Confirm Password']").type(password);
    cy.get("button[type='submit']").click();

    cy.visit("/login");
    cy.get("input[placeholder='Email']").type(email);
    cy.get("input[placeholder='Password']").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/pantry");
  });

  it("adds a pantry item and displays it in the list", () => {
    cy.visit("/pantry");
    cy.get("input[placeholder='Name']").type("Onion");
    cy.get("input[placeholder='Quantity']").type("2");
    cy.get("input[placeholder='Unit']").type("whole");
    cy.get("button[type='submit']").click();
    cy.contains("Onion").should("exist");
  });
});