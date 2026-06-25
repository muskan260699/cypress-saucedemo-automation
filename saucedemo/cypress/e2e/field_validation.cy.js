import LoginPage from "../support/pages/LoginPage";

describe("Invalid Login Details", () => {

  let users;

  before(() => {
    cy.fixture("users_data").then((data) => {
      users = data;
    });
  });

  it("should not login with empty credentials", () => {
    cy.login("", "");
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username is required");
  });

  it("should not login with empty username", () => {
    cy.login("", users.user_details.password);
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username is required");
  });

  it("should not login with empty password", () => {
    cy.login(users.user_details.username, "");
    LoginPage.getErrorMessage().should("be.visible").should("contain","Password is required");
  });

  it("should not login with invalid credentials", () => {
    cy.login(users.invalid_details.username,users.invalid_details.password);
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username and password do not match any user in this service");
  });

});