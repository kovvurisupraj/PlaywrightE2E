import { type Page, expect, type Locator } from '@playwright/test';

export class CartPage {
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('.cart_item');
  }

  async verifyCartContains(productName: string): Promise<void> {
    const product = this.cartItems.filter({ hasText: productName });
    await expect(product).toHaveCount(1);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
