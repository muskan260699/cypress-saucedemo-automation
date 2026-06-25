import ProductsPage from "../support/pages/ProductsPage";
import CartPage from "../support/pages/CartPage";
import ProductDetailPage from "../support/pages/ProductDetailPage";
import CheckoutPage from "../support/pages/CheckoutPage";

describe("Test case 1 - Shopping Cart Workflow - End-to-End Validation", () => {
  let users;
  let productsData;

  //stored data in fixtures and used it over here
  before(() => {
    cy.fixture("users_data").then((data) => {
      users = data;
    });
    cy.fixture("products_data").then((data) => {
      productsData = data;
    });
  });

  beforeEach(() => {
    //Login into the website and check if it lands on the inventory page 
    cy.login(users.user_details.username, users.user_details.password);
    cy.url().should("include", "/inventory.html");
    ProductsPage.getInventoryList().should("be.visible");
  });

  it("User should complete full cart workflow with state validation", () => {
    const { items } = productsData;
    const { firstName, lastName, postalCode } = users.user_details;
    const productToRemove = "Sauce Labs Onesie";

    // Adding products to the cart
    items.forEach((item) => {
      ProductsPage.addProductToCart(item);
    });
    
    //verify cart badge after adding producting
    ProductsPage.getCartBadge().should("have.text", items.length.toString());

    ProductsPage.goToCart();
    items.forEach((item) => {
      CartPage.getCartItem(item).should("exist");
    });

    // navigate and remove Onesie product and validate - back to products buttons
    CartPage.openProductFromCart(productToRemove);
    cy.url().should("include", "/inventory-item.html");
    ProductDetailPage.removeFromCart();
    ProductDetailPage.getCartBadge().should("have.text", "2"); // updated badge count validation
    ProductDetailPage.backToProducts();

    const remainingProducts = items.filter((item) => item !== productToRemove);

    ProductsPage.getAllProductItems().each(($item) => {
      const productName = ProductsPage.getProductName($item);

      if (remainingProducts.includes(productName)) {
        cy.wrap($item).contains("Remove").should("exist");
      } else {
        cy.wrap($item).contains("Add to cart").should("exist");
      }
    });

    ProductsPage.goToCart();

    remainingProducts.forEach((product) => {
      CartPage.getCartItem(product).should("exist");
    });
    CartPage.getAllCartItems().should("not.contain", productToRemove);

    // Checkout flow
    CartPage.checkout();
    CheckoutPage.fillCheckoutInfo({ firstName, lastName, postalCode });
    CheckoutPage.finishOrder();
    CheckoutPage.getCompleteHeader().should("have.text", "Thank you for your order!");

    // Aftee checkout, the inventory and the cart should comeback to its default state
    CheckoutPage.backToProducts();
    cy.url().should("include", "/inventory.html");
    ProductsPage.getCartBadge().should("not.exist");
  });
});

