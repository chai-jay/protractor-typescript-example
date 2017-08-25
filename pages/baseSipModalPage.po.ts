import { browser, element, by, ExpectedConditions } from 'protractor';
import { BrowserUtil } from './../utils/browser.util';
import { BasePage } from './basePage.po';

/**
 * Class representing page with AngularJS Sign In/Purchase Modal.
 * Examples are Document Page and Virtual Journal page. 
 * 
 * @export
 * @class BasePage
 */
export class BaseSipModalPage extends BasePage {
  constructor() {
    super();
  }

  getSipModal() {
    return element(by.css('.sip-modal'));
  }

  getSipModalAddToCartbutton() {
    return this.getSipModal().element(by.css('.sip-purchase-cart-button'));
  }

  /**
   * Returns button to open AngularJS Sign In/Purchase Modal.
   * 
   * @memberof DocumentPage
   */
  getSipModalButton() {
    return element(by.css('.sip-modal-button'));
  }

  getSipModalCloseButton() {
    return this.getSipModal().element(by.css('i.modal-close[role="button"'));
  }

  getSipModalPurchaseTabLink() {
    return this.getSipModal().element(by.linkText('Purchase'));
  }

  /**
   * Login using AngularJS Sign In/Purchase modal.
   * Clicks on SIP Modal button and open SIP Modal
   * and enters username and password and submits. 
   * 
   * @param {string} username Username of user to login as.
   * @param {string} password Password of user to login as
   * @memberof DocumentPage
   */
  loginSipModal(username: string, password: string) {
    const sipModalButton = this.getSipModalButton();
    const sipModal = this.getSipModal();
    const usernameInput = sipModal.element(by.css('[name="username"]'));
    const passwordInput = sipModal.element(by.css('[name="password"]'));
    const submitButton = sipModal.element(by.css('.sip-signin-button'));
    
    sipModalButton.click();
    BrowserUtil.waitForElementVisibility(sipModal, 500);
    usernameInput.sendKeys(username);
    passwordInput.sendKeys(password);
    submitButton.click();
  }
}