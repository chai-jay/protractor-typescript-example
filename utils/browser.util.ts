import { browser, element, by, ExpectedConditions, ElementFinder } from 'protractor';

/**
 * Utility class for commonly called Protractor.browser methods.
 * The methods should be static and 
 * not require new instance of class to use.
 * 
 * @export
 * @class BrowserUtil
 */
export class BrowserUtil {
  constructor() {}

  /**
   * * Makes the browser wait for an element to be visible before
   * executing more code. Can pass CSS selector or ElementFinder.
   * 
   * @static
   * @param {string | ElementFinder} cssSelectorOrElement CSS selector to select the element or or Protractor.ElementFinder
   * @param {number} [timeout=1500] Max milliseconds to wait. Defaults to 1500.
   * @memberof BrowserUtil
   */
  static waitForElementVisibility(cssSelectorOrElement: string | ElementFinder, timeout: number = 1500): void {
    let elementToWaitFor: ElementFinder;
    if (typeof cssSelectorOrElement === 'string') {
      elementToWaitFor = element(by.css(cssSelectorOrElement));
    } else {
      elementToWaitFor = cssSelectorOrElement;
    }
    browser.wait(ExpectedConditions.visibilityOf(elementToWaitFor), timeout);
  }

  /**
   * Returns environment the test suite is executed on
   * by checking `browser.params.baseUrl`.
   * 
   * @static
   * @returns {Environment} 
   * @memberof BrowserUtil
   */
  static getEnv(): Environment {
    const baseUrl = browser.params.baseUrl;

    if (baseUrl.indexOf('qaenvurl') != -1) {
      return Environment.QA;
    } else if (baseUrl.indexOf('prodenvurl') != -1) {
      return Environment.PROD;
    } else {
      return Environment.LOCAL;
    }
  }
}

/**
 * Enum for different types of environment this test suite
 * is running on. 
 * 
 * @export
 * @enum {string}
 */
export enum Environment {
  QA = 'qa',
  PROD = 'prod',
  LOCAL = 'local'
}
