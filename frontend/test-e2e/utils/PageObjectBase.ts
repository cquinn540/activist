import { type Page, expect } from "@playwright/test";

export default abstract class PageObjectBase {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async isMobile(): Promise<boolean> {
    const viewportSize = this.page.viewportSize();
    const isMobileViewport = viewportSize !== null && viewportSize.width < 768;
    const isMobileEmulation = await this.page.evaluate(
      () => "ontouchstart" in window
    );
    return isMobileViewport && isMobileEmulation;
  }

  public async expectTheme(theme: string): Promise<void> {
    await expect(this.page.locator("html")).toHaveClass(theme);
  }
}
