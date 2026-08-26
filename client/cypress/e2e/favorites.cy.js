describe("Recipe search and favorites", () => {
  const email = `fav${Date.now()}@test.com`;
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

  it("searches a recipe, saves it, and sees it in favorites", () => {
    cy.visit("/recipes");
    cy.get("input[placeholder*='chicken']").type("chicken");
    cy.contains("button", "Search").click();
    cy.contains("Save to Favorites").first().click();
    cy.contains("Saved").should("exist");

    cy.visit("/favorites");
    cy.contains("li", "Chicken", { matchCase: false }).should("exist");
  });
});