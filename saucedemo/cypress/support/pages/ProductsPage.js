import BasePage from "./BasePage";

class ProductsPage extends BasePage {
  get inventoryItems() {
    return cy.get(".inventory_item");
  }
  inventoryItem(name) {
    return cy.contains(".inventory_item", name);
  }

  getProductName($item) {
    return $item.find(".inventory_item_name").text();
  }

  visit() {
    super.visit("/inventory.html");
  }

  addProductToCart(productName) {
    this.inventoryItem(productName).within(() => {
      cy.contains("Add to cart").click();
    });
  }

  removeProductFromCart(productName) {
    this.inventoryItem(productName).within(() => {
      cy.contains("Remove").click();
    });
  }

  getProductItem(productName) {
    return this.inventoryItem(productName);
  }

  getAllProductItems() {
    return this.inventoryItems;
  }

 getInventoryList() {
  return cy.get(".inventory_list");
}

}


export default new ProductsPage();