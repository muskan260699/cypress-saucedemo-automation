import BasePage from "./BasePage";

class ProductDetailPage extends BasePage {
  removeFromCart() {
    cy.contains("Remove").click();
  }
}

export default new ProductDetailPage();