import { browser, element, by, ExpectedConditions } from 'protractor';

/**
 * Class representing generic page.
 * Methods/properties for global elements should go here. 
 * 
 * @export
 * @class BasePage
 */
export class BasePage {
  constructor(public isNewNotificationFeatureClosed: boolean = false) {}
  
  closeNewFeatureNotification() {
    if (!this.isNewNotificationFeatureClosed) {
      browser.wait(ExpectedConditions.visibilityOf(this.getNewFeatureNotification()), 1500);
      this.getNewFeatureNotificationCloseButton().click();
      this.isNewNotificationFeatureClosed = true;
    }
  }

  getHeader() {
    return element(by.css('.Header#xplore-header'));
  }

  getInstSignOutLink() {
    return element(by.css('#loggedInLogo a.sign-out'));
  }

  getMinicartSummaryContainer() {
    return element(by.css('.cart-summary'));
  }

  /**
   * Returns element used to trigger showing of Minicart
   * summary popover.
   * 
   * @returns 
   * @memberof BasePage
   */
  getMinicartSummaryContainerTrigger() {
    return element(by.css('#global-header-cart-count'));
  }

  /**
   * Returns link which, when clicked, will remove selected item
   * from user's cart. 
   * TODO: Figure out what happens/how to remove all items from cart. 
   * 
   * @returns 
   * @memberof BasePage
   */
  getMinicartSummaryRemoveItemLink() {
    return this.getMinicartSummaryContainer().element(by.css('.mc-remove-item-link'));
  }

  getMinicartSummaryRemoveItemConfirmLink() {
    return this.getMinicartSummaryContainer().element(by.css('.mc-remove-item-confirm-action'));
  }

  getMinicartCountText() {
    return element(by.css('.Metanav #cartCount')).getText();
  }

  getNewFeatureNotification() {
    return element(by.css('#new-feature-notification'));
  }

  getNewFeatureNotificationCloseButton() {
    return this.getNewFeatureNotification().element(by.css('button#close-new-feature'));
  }

  /**
   * Retrieves the link to open Personal Sign In popover. 
   * Displayed when no Web Account is logged in.
   * 
   * @returns 
   * @memberof BasePage
   */
  getWebAcctSignInPopoverLink() {
    return element(by.css('.Metanav a.sign-in'));
  }

  /**
   * Retrieves the link displayed after Web Account
   * is logged in. Clicking/focusing on link opens the 
   * Web Account/Personal Member menu (eg with Sign Out link). 
   * 
   * @returns 
   * @memberof BasePage
   */
  getWebAcctMenuLink() {
    return element(by.css('.Metanav .Menu .welcome > a'));
  }

  /**
   * Returns Global Header/Metanav's Web Account Sign Out link.
   * The user needs to be logged in as web account and
   * the Web Account Menu Link needs to be hovered over/focused.
   * 
   * @returns 
   * @memberof BasePage
   */
  getWebAcctSignOutLink() {
    browser.actions().mouseMove(this.getWebAcctMenuLink()).perform(); // Open the Web Account dropdown menu
    return element(by.css('.Metanav .Menu .welcome a.sign-out'));
  }

  /**
   * Opens global header's Institutional Sign In modal and
   * signs in using specified username/password.
   * 
   * @param {string} username Username to login as
   * @param {string} password Password to login as
   */
  loginInstSignInModal(username: string, password: string) {
    const signInLink = element(by.css('.Header .institutional-signin a'));
    const instSignInModal = element(by.css('form#modalWindowSignIn1'));
    const usernameInput = instSignInModal.element(by.css('input[name="username"]'));
    const passwordInput = instSignInModal.element(by.css('input[name="password"]'));
    const submitButton = instSignInModal.element(by.css('button#modalWindowSignInBtn'));

    signInLink.click();
    browser.wait(ExpectedConditions.visibilityOf(instSignInModal), 2000);
    usernameInput.sendKeys(username);
    passwordInput.sendKeys(password);
    submitButton.click();
  }
  
  /**
   * Opens global header's Personal Sign In popover and
   * signs in using specified username/password.
   * 
   * @param {string} username Username to login as
   * @param {string} password Password to login as
   */
  loginPersonalSignInPopover(username: string, password: string) {
    const popoverTriggerLink = this.getWebAcctSignInPopoverLink();
    const signInPopover = element(by.css('#personal-sign-in'));
    const usernameInput = signInPopover.element(by.css('input[name="username"]'));
    const passwordInput = signInPopover.element(by.css('input[name="password"]'));
    const submitButton = signInPopover.element(by.css('button.js-submit'));

    popoverTriggerLink.click();
    browser.wait(ExpectedConditions.visibilityOf(signInPopover), 500);
    usernameInput.sendKeys(username);
    passwordInput.sendKeys(password);
    submitButton.click();
  }

  /**
   * Navigates browser to a page on Xplore,
   * using baseUrl from params passed in. 
   * Should use relative URL (eg '/Xplore/home.jsp').
   * 
   * @param {string} relativeUrl Path of URL after the host (eg '/Xplore/home.jsp').
   * @memberof BasePage
   */
  navigateTo(relativeUrl: string) {
    browser.get(browser.params.baseUrl + relativeUrl);
  }

}
