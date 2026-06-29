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

  getItemPrices() {
    return cy.get(".inventory_item_price").then(($prices) => {
      return [...$prices].map((el) => parseFloat(el.innerText.split("$")[1]));
    });
  }
}

export default new CartPage();
