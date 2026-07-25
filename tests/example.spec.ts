import { test } from '../fixtures/pageFixtures';
import checkoutData from '../data/checkoutData.json';
for (const data of checkoutData) {

  test(`Open SauceDemo login page for ${data.scenarioName}`, async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {



    await loginPage.open();
    await loginPage.login(data.username, data.password);
    await loginPage.verifyLoginSuccessful();

    await inventoryPage.addProductToCart(data.productName);
    await inventoryPage.verifyCartCount(1);
    await inventoryPage.openCart();


    await cartPage.verifyCartContains(data.productName);
    await cartPage.verifyCartCount(1);
    await cartPage.proceedToCheckout();

    await checkoutPage.enterCustomerInformation(
      data.firstName,
      data.lastName,
      data.postalCode
    );

    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderCompleted();


  })
}