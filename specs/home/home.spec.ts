import { browser } from 'protractor';
import { HomePage } from '../../pages/homePage.po';

describe('Home Page', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.goToPage();
  });

  it('should have the correct elements', () => {
    // TODO: Fill out this spec!
    // browser.wait(ExpectedConditions.presenceOf(homePage.getHeader()), 2000);
    expect(homePage.getHeader().isPresent()).toBe(true);
  });
});