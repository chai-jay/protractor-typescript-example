import { User } from './../data/users.data';
import { BasePage } from './../pages/basePage.po';
import { browser, element, by, ExpectedConditions, ElementFinder } from 'protractor';

/**
 * Utility class for commonly called Login-related methods.
 * The methods should be static and 
 * not require new instance of class to use.
 * 
 * @export
 * @class LoginUtil
 */
export class LoginUtil {
  constructor() {}

  /**
   * To be called for institutional user login specs.
   * Allow for different login functions to be called because
   * inst user credentials work in any of our login forms
   * (eg Inst Sign In Modal, Personal Sign In popover, SIP Modal). 
   * 
   * @static
   * @param {BasePage} basePage The instance of BasePage used to call login function.
   * @param {Function} loginFunc Login function to use (eg BasePage.loginInstSignInModal) 
   * @param {User} user User to login as. 
   * @memberof BrowserUtil
   */
  static instUserLoginSpec(basePage: BasePage, loginFunc: Function, user: User) {
    // Use Function.call() so "this" in loginFunc is correct
    loginFunc.call(basePage, user.username, user.password);
    browser.driver.sleep(4000); // Wait because login makes page reload
    
    expect(basePage.getInstSignOutLink().isPresent()).toBe(true);
  }

  /**
   * To be called for web account user login specs.
   * Allow for different login functions to be called because
   * web acct credentials work in any of our login forms
   * (eg Inst Sign In Modal, Personal Sign In popover, SIP Modal). 
   * 
   * @static
   * @param {BasePage} basePage The instance of BasePage used to call login function.
   * @param {Function} loginFunc Login function to use (eg BasePage.loginInstSignInModal) 
   * @param {User} user User to login as. 
   * @memberof BrowserUtil
   */
  static webAcctUserLoginSpec(basePage: BasePage, loginFunc: Function, user: User) {
    // Use Function.call() so "this" in loginFunc is correct
    loginFunc.call(basePage, user.username, user.password);
    browser.driver.sleep(4000); // Wait because login makes page reload

    expect(browser.isElementPresent(basePage.getWebAcctSignOutLink())).toBe(true);
    expect(browser.manage().getCookie('somecookiename')).toBeTruthy();
  }
}