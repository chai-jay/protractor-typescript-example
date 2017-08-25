import { browser } from 'protractor';
import { VirtualJournalCurrentIssuePage } from './../../pages/virtualJournalCurrentIssuePage.po';
import { User, instUsers, webUsers } from './../../data/users.data';
import { VirtualJournalPublication } from './../../data/virtualJournals.data';
import { BrowserUtil } from './../../utils/browser.util';
import { LoginUtil } from './../../utils/login.util';

// Maybe run spec for an old issue page??
describe('Login - Virtual Journal - Current Issue Page - SIP Modal', () => {
  let vjPage: VirtualJournalCurrentIssuePage;
  const publicationSlug: VirtualJournalPublication = VirtualJournalPublication.BIOCOMP;
  let isInstLoggedIn: boolean = false;
  let isWebAccountLoggedIn: boolean = false;
  
  beforeEach(() => {
    vjPage = new VirtualJournalCurrentIssuePage(publicationSlug);
    vjPage.goToPage();
    if (!vjPage.isNewNotificationFeatureClosed) {
      vjPage.closeNewFeatureNotification();
    }
  });

  afterEach(() => {
    // Reset state of page in teardown

    // Should log out if logged in
    if (isInstLoggedIn) {
      vjPage.getInstSignOutLink().click();
      isInstLoggedIn = false;
    } else if (isWebAccountLoggedIn) {
      vjPage.getWebAcctSignOutLink().click();
      isWebAccountLoggedIn = false;
    }

    // Delete cookie that hides New Feature Notification
    browser.manage().deleteCookie('somerandomcookie');
  });

  it('should sign in institutional user after entering valid credentials', () => {
    const instUser: User = instUsers[0];
    LoginUtil.instUserLoginSpec(vjPage, vjPage.loginSipModal, instUser);
    isInstLoggedIn = true;
  });

  it('should add IEEE.org cookie after personal member sign in', () => {
    const webAccountUser: User = webUsers[0];
    LoginUtil.webAcctUserLoginSpec(vjPage, vjPage.loginSipModal, webAccountUser);
    isWebAccountLoggedIn = true;
  });

});