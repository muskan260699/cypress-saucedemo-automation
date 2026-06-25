import BasePage from "./BasePage";

class CartPage extends BasePage {
  get cartItems() {
    return cy.get(".cart_item");
  }

  get checkoutButton() {
    return cy.get("#checkout");
  }

  cartItem(name) {
    return cy.contains(".cart_item", name);
  }

  getCartItem(productName) {
    return this.cartItem(productName);
  }

  getAllCartItems() {
    return this.cartItems;
  }

  openProductFromCart(productName) {
    this.cartItem(productName).find("a").first().click();
  }

  checkout() {
    this.checkoutButton.click();
  }
}

export default new CartPage();