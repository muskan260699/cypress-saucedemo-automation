import LoginPage from "../support/pages/LoginPage";

describe("Invalid Login Details", () => {

  let users;

  before(() => {
    cy.fixture("users_data").then((data) => {
      users = data;
    });
  });

  it("Users should not be able to login with empty credentials", () => {
    cy.login("", "");
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username is required");
  });

  it("Users should get error if username is empty", () => {
    cy.login("", users.user_details.password);
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username is required");
  });

  it("users should get error if password is empty", () => {
    cy.login(users.user_details.username, "");
    LoginPage.getErrorMessage().should("be.visible").should("contain","Password is required");
  });

  it("Users should not be able login with invalid credentials", () => {
    cy.login(users.invalid_details.username,users.invalid_details.password);
    LoginPage.getErrorMessage().should("be.visible").should("contain","Username and password do not match any user in this service");
  });

});

