import { type Page, expect, type Locator } from '@playwright/test';

export class LoginPage {

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly productsTitle: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.productsTitle = page.getByText('Products');
    }

    async open(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccessful(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.productsTitle).toBeVisible();
    }

}