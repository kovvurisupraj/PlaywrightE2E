import { type Page, expect, type Locator } from '@playwright/test';

export class InventoryPage {

    private readonly shoppingCartBadge: Locator;
    private readonly shoppingCartLink: Locator;


    constructor(private readonly page: Page) {
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    async addProductToCart(productName: string): Promise<void> {
        const productLocator = this.page.locator('.inventory_item').filter({ hasText: productName });
        await productLocator.getByRole('button', { name: 'Add to cart' }).click();
    }

    async verifyCartCount(expectedCount: number): Promise<void> {
        await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
    }

    async openCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }
}
