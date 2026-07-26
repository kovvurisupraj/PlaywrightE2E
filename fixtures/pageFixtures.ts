import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { request, type APIRequestContext } from '@playwright/test';
import { BookingApi } from '../api/BookingApi';

import { DatabaseClient } from '../database/DatabaseClient';

type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  apiRequest: APIRequestContext;
  bookingApi: BookingApi;
  database: DatabaseClient;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  apiRequest: async ({}, use) => {
    const apiRequest = await request.newContext({
      baseURL: process.env.API_BASE_URL,
    });

    await use(apiRequest);

    await apiRequest.dispose();
  },

  bookingApi: async ({ apiRequest }, use) => {
    await use(new BookingApi(apiRequest));
  },

  database: async ({}, use) => {
    const database = new DatabaseClient('./database/playwright.db');

    database.createOrdersTable();

    await use(database);

    database.close();
  },
});
