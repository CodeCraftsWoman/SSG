import {expect, test} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { SecureAreaPage } from '../pages/secureAreaPage'

let loginPage:LoginPage;
let secureAreaPage:SecureAreaPage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
})

test ("As a User verify that Practice login page exist" , async ({page})=> {
    loginPage = new LoginPage(page);
    await expect(page.url()).toEqual(process.env.PAGE_URL+"login");
})

test ("As a User verify that Practice login page title is exist and correct" , async ({page})=> {
    loginPage = new LoginPage(page);
    const actualTitle = await loginPage.loginPageTitle();
    const expectedTitle = "Login Page";
    await expect(actualTitle).toEqual(expectedTitle);
})

test ("As a User I login to Practice page with valid username and password and verify I'm at secure page " , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashMessage = "You logged into a secure area!";
    const expectedTitle = "Secure Area";
    await loginPage.login(process.env.TEST_USERNAME||'', process.env.TEST_PASSWORD||'');
    const actualFlashMessage = await secureAreaPage.flashMessage();
    const actualTitle = await secureAreaPage.secureAreaTitle();
    await expect(actualFlashMessage).toEqual(expectedFlashMessage);
    await expect(actualTitle).toEqual(expectedTitle);
    await expect(page.url()).toEqual(process.env.PAGE_URL+"secure");
})

test ("As a User I try to go directly to the Secure page without login and verify the error message" , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    await secureAreaPage.gotoSecurePage();
    const expectedFlashErrorMessage = "You must login to view the secure area!";
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage);
})

test ("As a User click the login button without enter any username or password in Practice page and verify the error message" , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashErrorMessage = "Your username is invalid!"; // User is getting this message when username and password is not entered, message should be "please enter username and password or message should be 'please enter username and password'"
    await loginPage.login('', '');
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage);
})

test ("As a User click the login button with entering valid username and no password in Practice page and verify the error message" , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashErrorMessage = "Your password is invalid!";
    await loginPage.login(process.env.TEST_USERNAME||'', '');
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage);
})

test ("As a User click the login button with entering no username and valid password in Practice page and verify the error message" , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashErrorMessage = "Your username is invalid!";
    await loginPage.login( '', process.env.TEST_PASSWORD||'');
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage);
})

test ("As a User log out from the Secure page and verify the successful message and login page" , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashMessage = "You logged out of the secure area!";
    const expectedTitle = "Login Page";
    await loginPage.login(process.env.TEST_USERNAME||'', process.env.TEST_PASSWORD||'');
    await secureAreaPage.loggedOut();
    const actualFlashMessage = await loginPage.flashMessage();
    const actualTitle = await loginPage.loginPageTitle();
    await expect(actualFlashMessage).toEqual(expectedFlashMessage);
    await expect(actualTitle).toEqual(expectedTitle);
})

test ("As a User I try to login to Practice page with valid username with Capital case and password and verify the error message " , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashErrorMessage = "Your username is invalid!";
    const capitalUsername = (process.env.TEST_USERNAME||'').toUpperCase();
    await loginPage.login(capitalUsername, process.env.TEST_PASSWORD||'');
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage);
})

test ("As a User I try to login to Practice page with valid username and password with Capital case and verify the error message " , async ({page})=> {
    loginPage = new LoginPage(page);
    secureAreaPage = new SecureAreaPage(page);
    const expectedFlashErrorMessage = "Your password is invalid!";
    const capitalPassword = (process.env.TEST_PASSWORD||'').toUpperCase();
    await loginPage.login(process.env.TEST_USERNAME||'', capitalPassword);
    const actualFlashErrorMessage = await loginPage.flashMessage();
    await expect(actualFlashErrorMessage).toEqual(expectedFlashErrorMessage+"hello");
})
