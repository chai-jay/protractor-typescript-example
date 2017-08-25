import { browser } from 'protractor';
import { DocumentPage } from './../../pages/documentPage.po';
import { User, instUsers, webUsers } from './../../data/users.data';
import { documentsStandard } from './../../data/documents.data';
import { BrowserUtil } from './../../utils/browser.util';
import { LoginUtil } from './../../utils/login.util';

describe('Login - Document Page - SIP Modal', () => {
  let docPage: DocumentPage;
  const documentId: number = documentsStandard[0];
  let isInstLoggedIn: boolean = false;
  let isWebAccountLoggedIn: boolean = false;
  
  beforeEach(() => {
    docPage = new DocumentPage(documentId);
    docPage.goToPage();
    if (!docPage.isNewNotificationFeatureClosed) {
      docPage.closeNewFeatureNotification();
    }
    // BrowserUtil.waitForElementVisibility('.Header .institutional-signin', 2000);
  });

  afterEach(() => {
    // Reset state of page in teardown

    // Should log out if logged in
    if (isInstLoggedIn) {
      docPage.getInstSignOutLink().click();
      isInstLoggedIn = false;
    } else if (isWebAccountLoggedIn) {
      docPage.getWebAcctSignOutLink().click();
      isWebAccountLoggedIn = false;
    }

    // Delete cookie that hides New Feature Notification
    browser.manage().deleteCookie('somerandomcookie');
  });

  it('should sign in institutional user after entering valid credentials', () => {
    const instUser: User = instUsers[0];
    LoginUtil.instUserLoginSpec(docPage, docPage.loginSipModal, instUser);
    isInstLoggedIn = true;
  });

  it('should add IEEE.org cookie after personal member sign in', () => {
    const webAccountUser: User = webUsers[0];
    LoginUtil.webAcctUserLoginSpec(docPage, docPage.loginSipModal, webAccountUser);
    isWebAccountLoggedIn = true;
  });

});