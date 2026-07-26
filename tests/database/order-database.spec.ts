import { test } from '../../fixtures/pageFixtures';
import { expect } from '@playwright/test';

test('insert and validate an order in SQLite', async ({ database }) => {
  database.createOrdersTable();

  const orderId = database.insertOrder(
    'Venkata Kovvuri',
    'Sauce Labs Backpack',
    1,
    29.99,
    'CONFIRMED'
  );

  const order = database.getOrderById(orderId);

  expect(order).toBeDefined();
  expect(order?.id).toBe(orderId);
  expect(order?.customerName).toBe('Venkata Kovvuri');
  expect(order?.productName).toBe('Sauce Labs Backpack');
  expect(order?.quantity).toBe(1);
  expect(order?.totalPrice).toBe(29.99);
  expect(order?.status).toBe('CONFIRMED');
});
