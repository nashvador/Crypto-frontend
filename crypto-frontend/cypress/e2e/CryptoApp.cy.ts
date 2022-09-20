describe("Crypto App", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("CoinNOW");
    cy.contains("7 days");
    cy.contains("Price");
  });
});
