import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly getUsernameBox: Locator;
    readonly getPasswordBox: Locator;
    readonly getLoginButton: Locator;
    readonly getLoginTitle: Locator;
    readonly getFlashMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.getUsernameBox = page.locator('#username');
        this.getPasswordBox = page.getByRole('textbox', {name: "password"});
        this.getLoginButton = page.locator('[type ="submit"]');
        this.getLoginTitle = page.locator('//h1[contains(text(), "Login Page")]')
        this.getFlashMessage = page.locator('#flash-message')
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.getUsernameBox.fill(username);
        await this.getPasswordBox.fill(password);
        await this.getLoginButton.click()
    }

    async loginPageTitle(){
        const titleText = await this.getLoginTitle.innerText();
        return titleText;
    }

    async flashMessage(){
        const titleText = await this.getFlashMessage.innerText();
        return titleText;
    }

    async loggedOutFlashMessage(){
        const titleText = await this.getFlashMessage.innerText();
        return titleText;
    }
}