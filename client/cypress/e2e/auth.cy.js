describe("Authentication", () => {
  const email = `test${Date.now()}@test.com`;
  const password = "pass1234";

  it("registers a new user and redirects to login", () => {
    cy.visit("/register");
    cy.get("input[placeholder='Email']").type(email);
    cy.get("input[placeholder='Password']").type(password);
    cy.get("input[placeholder='Confirm Password']").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/login");
  });

  it("logs in and lands on the pantry page", () => {
    cy.visit("/login");
    cy.get("input[placeholder='Email']").type(email);
    cy.get("input[placeholder='Password']").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/pantry");
  });
});