import type { Page } from "@playwright/test";

export default class PageObjectBase {
  public readonly page: Page;
  public readonly pageName?: string;
  public readonly pageURL?: string;

  constructor(page: Page, pageName: string, pageURL: string) {
    this.page = page;
    this.pageName = pageName;
    this.pageURL = pageURL;
  }

  public getPageName(): string {
    return this.pageName ?? "Unknown Page";
  }

  public async isMobile(): Promise<boolean> {
    const viewportSize = this.page.viewportSize();
    const isMobileViewport = viewportSize !== null && viewportSize.width < 768;
    const isMobileEmulation = await this.page.evaluate(
      () => "ontouchstart" in window
    );
    return isMobileViewport && isMobileEmulation;
  }

  public async currentTheme(): Promise<string> {
    return (await this.page.locator("html").getAttribute("class")) ?? "";
  }
}
