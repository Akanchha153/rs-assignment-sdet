//i//mport { click} from '../utils/actions.js';
import { LoginPageLocators } from "../constants/login.js";
import config from "../test-utils/config.js";

class LoginPage {
  get inputEmail() {
    return $(LoginPageLocators.emailInput);
  }
  get inputPassword() {
    return $(LoginPageLocators.passwordInput);
  }
  get loginButton() {
    return $(LoginPageLocators.loginButton);
  }
  get connectionsNav() {
    return $(LoginPageLocators.connectionsNav);
  }
  async open() {
    await browser.url(config.baseUrl);
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.waitForExist({ timeout: config.timeout });
    await this.inputPassword.setValue(password);
    await this.loginButton.click();
    await browser.pause(5000);
  }
  async goToConnections() {
    await this.connectionsNav.waitForDisplayed({ timeout: 100000 });
    await this.connectionsNav.click();
  }
}
export default new LoginPage();
