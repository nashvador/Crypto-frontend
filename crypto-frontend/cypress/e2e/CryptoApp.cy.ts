/// <reference types="cypress" />

describe("Crypto App Main Page Functions", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.intercept("POST", "/api/coininfo", (req) => {
      req.continue((res) => {
        if (req.body.url === "https://api.coingecko.com/api/v3/global") {
          res.send({ fixture: "globalData.json" });
        }
      });
    });
  });

  it("front page can be opened and Api Call is working", function () {
    cy.contains("CoinNOW");
    cy.contains("7 days");
    cy.contains("Price");
    cy.contains("Bitcoin");
  });

  it("Nav Bar is functioning", function () {
    cy.contains("Login").click();
    cy.location("pathname").should("eq", "/login");
    cy.contains("Portfolio").click();
    cy.location("pathname").should("eq", "/portfolio");
  });

  it("Can direct to coin page if a coin is clicked", function () {
    cy.contains("Bitcoin").click();
    cy.location("pathname").should("eq", "/coins/bitcoin");
    cy.contains("algorithm");
  });

  it("Can direct to coin page if searched up", function () {
    cy.get("#Search-Bar").type("tet");
    cy.contains("tether").click();
    cy.location("pathname").should("eq", "/coins/tether");
  });
});

describe("Login Page and Portfolio functionality", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/login");
    cy.intercept("POST", "/api/coininfo", (req) => {
      if (req.body.url === "https://api.coingecko.com/api/v3/global") {
        req.reply({ fixture: "globalData.json" });
      }
    });
  });

  it("Sign Up page can be opened/redirected to", function () {
    cy.contains("Sign in");
    cy.contains("Sign Up").click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("wrong password user cannot log in", function () {
    cy.get("#username").type("nash");
    cy.get("#password").type("cash");
    cy.get("#login-button").click();
    cy.contains("Invalid username or password");
    cy.get("html").should("not.contain", "nash is logged in");
  });

  it("user can log in", function () {
    cy.get("#username").type("nash");
    cy.get("#password").type("nash");
    cy.get("#login-button").click();
    cy.contains("nash is logged in");
    cy.contains("Bitcoin");
    // cy.get("#Portfolio-Modal").click()
    // cy.get("#Coin-Purchased").type("tet")
    // cy.contains("tether").click();
    // cy.get("#Amount-Purchased").type("2")
    // cy.get("#Date-Purchased").type("09/09/2022")
    // cy.get("#Buy-Coin").click()
    // cy.contains("Tether")
  });
});
