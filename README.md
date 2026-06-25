# cypress-saucedemo-automation

Building end-to-end test using Cypress for Sauce Demo covering login, adding and validating cart details, completing the checkout flow and checking the various states.

Setup

1. Clone the repository
2. Install dependencies from the project root using the following command -> 
   --> npm install cypress --save-dev
3. Running the test cases:
   Headless mode : npx cypress run
   Headed mode : npx cypress open
   Executing a specific file : npx cypress run --spec "cypress/e2e/shopping_cart_flow.cy.js"
   Executing in a specific browser : npx cypress run --headed --browser chrome

I have added appropriate comments in the files for readability.
