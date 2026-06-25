import BasePage from "./BasePage";

class LoginPage extends BasePage {
  get username() {
    return cy.get("#user-name");
  }

  get password() {
    return cy.get("#password");
  }

  get loginButton() {
    return cy.get("#login-button");
  }

  visit() {
    super.visit("/");
  }

  login(username, password) {
    if (username) {
      this.username.type(username);
    }
    if (password) {
      this.password.type(password);
    }
    this.loginButton.click();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }
}

export default new LoginPage();
