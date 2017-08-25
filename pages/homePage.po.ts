import { browser } from 'protractor';
import { BasePage } from './basePage.po';

// Setting for Non-Angular Pages
// Tried putting in constructor but was buggy
// Might belong in the spec??
browser.ignoreSynchronization = true;

export class HomePage extends BasePage {
  constructor() {
    super();
  }

  goToPage() {
    this.navigateTo('/Xplore/home.jsp');
  }
}