import { browser } from 'protractor';
import { BrowserUtil } from './../../utils/browser.util';
import { DocumentPage } from './../../pages/documentPage.po';
import { documentWithPurchaseOptions } from './../../data/documents.data';

describe('Minicart - Document Page', () => {
  let docPage: DocumentPage;
  const documentId: number = documentWithPurchaseOptions[0];
  let numberOfItemsInCart = 0;
  
  beforeEach(() => {
    docPage = new DocumentPage(documentId);
    docPage.goToPage();
    if (!docPage.isNewNotificationFeatureClosed) {
      docPage.closeNewFeatureNotification();
    }
  });

  afterEach(() => {
    // Reset state of page in teardown
    // Delete cookie that hides New Feature Notification
    browser.manage().deleteCookie('somerandomcookie');

    // Remove added item in Cart if there are any
    for (let i = 0; i < numberOfItemsInCart; i++) {
      // Set ignoreSync to true bc minicart is not AngularJS
      browser.ignoreSynchronization = true;
      const minicartSummaryContainer = docPage.getMinicartSummaryContainer();
      docPage.getMinicartSummaryContainerTrigger().click();
      BrowserUtil.waitForElementVisibility(minicartSummaryContainer, 2000);
      docPage.getMinicartSummaryRemoveItemLink().click();
      docPage.getMinicartSummaryRemoveItemConfirmLink().click();
      browser.driver.sleep(4000); // Wait for Cart Item to be removed.
      // Set ignoreSync back to false for AngularJS
      browser.ignoreSynchronization = false;
    }
  });

  it('should update cart number after adding to cart', () => {
    docPage.getSipModalButton().click();
    docPage.getSipModalPurchaseTabLink().click();
    docPage.getSipModalAddToCartbutton().click();
    BrowserUtil.waitForElementVisibility('.sip-purchase-confirm', 5000);
    docPage.getSipModalCloseButton().click();
    numberOfItemsInCart = 1;

    expect(docPage.getMinicartCountText()).toBe('Cart(1)');
  });

  it('should maintain cart number after refreshing page', () => {
    // Add Item to Cart
    docPage.getSipModalButton().click();
    docPage.getSipModalPurchaseTabLink().click();
    docPage.getSipModalAddToCartbutton().click();
    BrowserUtil.waitForElementVisibility('.sip-purchase-confirm', 5000);
    // Refresh browser
    browser.refresh();
    numberOfItemsInCart = 1;

    // Set ignoreSync to true bc minicart is not AngularJS
    browser.ignoreSynchronization = true;
    // Give time for minicart count text to update
    browser.driver.sleep(3000);
    expect(docPage.getMinicartCountText()).toBe('Cart(1)');
    // Set ignoreSync back to false for AngularJS
    browser.ignoreSynchronization = false;
  });

});