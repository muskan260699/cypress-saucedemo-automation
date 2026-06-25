import BasePage from "./BasePage";

class CheckoutPage extends BasePage {
  get firstName() {
    return cy.get("#first-name");
  }

  get lastName() {
    return cy.get("#last-name");
  }

  get postalCode() {
    return cy.get("#postal-code");
  }

  get continueButton() {
    return cy.get("#continue");
  }

  get finishButton() {
    return cy.get("#finish");
  }

  get completeHeader() {
    return cy.get(".complete-header");
  }

  fillCheckoutInfo({ firstName, lastName, postalCode }) {
    this.firstName.type(firstName);
    this.lastName.type(lastName);
    this.postalCode.type(postalCode);
    this.continueButton.click();
  }

  finishOrder() {
    this.finishButton.click();
  }

  getCompleteHeader() {
    return this.completeHeader;
  }
getItemTotal() {
    return cy
      .get(".summary_subtotal_label")
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }

  getTax() {
    return cy
      .get(".summary_tax_label")
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }

  getOrderTotal() {
    return cy
      .get(".summary_total_label")
      .invoke("text")
      .then((text) => parseFloat(text.split("$")[1]));
  }
}

export default new CheckoutPage();
