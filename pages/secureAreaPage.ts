import { expect, type Locator, type Page } from "@playwright/test";

export class SecureAreaPage {

    readonly page: Page;
    readonly getLogoutButton: Locator;
    readonly getSecureAreaTitle: Locator;
    readonly getFlashMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.getLogoutButton = page.locator('.icon-signout:has-text("Logout")');
        this.getSecureAreaTitle = page.locator('//h1[contains(text(), "Secure Area")]')
        this.getFlashMessage = page.locator('#flash-message')
    }

    async gotoSecurePage() {
        await this.page.goto('/secure');
    }

    async secureAreaTitle(){
        const titleText = await this.getSecureAreaTitle.innerText();
        return titleText;
    }

    async flashMessage(){
        const titleText = await this.getFlashMessage.innerText();
        return titleText;
    }

    async loggedOut(){
        await this.getLogoutButton.click();
    }
}