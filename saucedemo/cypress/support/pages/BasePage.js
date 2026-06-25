
class BasePage {
  get cartLink() {
    return cy.get(".shopping_cart_link");
  }

  get cartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  get backToProductsButton() {
    return cy.get("#back-to-products");
  }

  visit(path = "/") {
    cy.visit(path);
  }

  goToCart() {
    this.cartLink.click();
  }

  getCartBadge() {
    return this.cartBadge;
  }

  backToProducts() {
    this.backToProductsButton.click();
  }
}

export default BasePage;