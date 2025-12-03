/**
 * Base Page Object Model class
 * Contains common methods used across all page objects
 */
export class BasePage {
  /**
   * Wait for an element to be visible
   */
  async waitForElementVisible(selector: string, timeout: number = 10000): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for an element to be present in DOM
   */
  async waitForElementPresent(selector: string, timeout: number = 10000): Promise<void> {
    const element = await $(selector);
    await element.waitForExist({ timeout });
  }

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    const element = await $(selector);
    await element.click();
  }

  /**
   * Type text into an element
   */
  async typeText(selector: string, text: string): Promise<void> {
    const element = await $(selector);
    await element.setValue(text);
  }

  /**
   * Clear text from an element
   */
  async clearText(selector: string): Promise<void> {
    const element = await $(selector);
    await element.clearValue();
  }

  /**
   * Get text from an element
   */
  async getText(selector: string): Promise<string> {
    const element = await $(selector);
    return await element.getText();
  }

  /**
   * Check if element is displayed
   */
  async isElementDisplayed(selector: string): Promise<boolean> {
    const element = await $(selector);
    return await element.isDisplayed();
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(selector: string): Promise<boolean> {
    const element = await $(selector);
    return await element.isEnabled();
  }

  /**
   * Get attribute value
   */
  async getAttributeValue(selector: string, attribute: string): Promise<string | null> {
    const element = await $(selector);
    return await element.getAttribute(attribute);
  }

  /**
   * Switch to iframe
   */
  async switchToFrame(frameSelector: string): Promise<void> {
    const frame = await $(frameSelector);
    await browser.switchToFrame(frame);
  }

  /**
   * Switch to parent frame
   */
  async switchToParentFrame(): Promise<void> {
    await browser.switchToParentFrame();
  }

  /**
   * Switch to window by handle
   */
  async switchToWindow(handle: string): Promise<void> {
    await browser.switchToWindow(handle);
  }

  /**
   * Get all window handles
   */
  async getWindowHandles(): Promise<string[]> {
    return await browser.getWindowHandles();
  }

  /**
   * Pause execution
   */
  async pause(milliseconds: number): Promise<void> {
    await browser.pause(milliseconds);
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string): Promise<void> {
    const element = await $(selector);
    await element.scrollIntoView();
  }

  /**
   * Double click element
   */
  async doubleClick(selector: string): Promise<void> {
    const element = await $(selector);
    await element.doubleClick();
  }

  /**
   * Right click element
   */
  async rightClick(selector: string): Promise<void> {
    const element = await $(selector);
    await element.click({ button: 2 });
  }

  /**
   * Hover over element
   */
  async hoverElement(selector: string): Promise<void> {
    const element = await $(selector);
    await element.moveTo();
  }

  /**
   * Get all texts from multiple elements
   */
  async getMultipleTexts(selector: string): Promise<string[]> {
    const elements = await $$(selector);
    const texts: string[] = [];
    for (const element of elements) {
      const text = await element.getText();
      texts.push(text);
    }
    return texts;
  }

  /**
   * Navigate to URL
   */
  async navigateTo(url: string): Promise<void> {
    await browser.url(url);
  }

  /**
   * Refresh page
   */
  async refreshPage(): Promise<void> {
    await browser.refresh();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return await browser.getUrl();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await browser.getTitle();
  }

  /**
   * Execute script
   */
  async executeScript(script: string, args?: any[]): Promise<any> {
    return await browser.execute(script, args);
  }

  /**
   * Accept alert
   */
  async acceptAlert(): Promise<void> {
    await browser.acceptAlert();
  }

  /**
   * Dismiss alert
   */
  async dismissAlert(): Promise<void> {
    await browser.dismissAlert();
  }

  /**
   * Get alert text
   */
  async getAlertText(): Promise<string> {
    return await browser.getAlertText();
  }

  /**
   * Type text in alert
   */
  async typeTextInAlert(text: string): Promise<void> {
    await browser.sendAlertText(text);
  }
}
