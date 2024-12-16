import type { Page, Locator } from "playwright";

export abstract class MainNavOptions {
  public page: Page;
  protected options: { locator: Locator; expectedRoute: string }[];

  constructor(page: Page) {
    this.page = page;
    this.options = [
      {
        locator: page.locator("#events"),
        expectedRoute: "events",
      },
      {
        locator: page.locator("#organizations"),
        expectedRoute: "organizations",
      },
    ];
  }

  public async testEachLink() {
    for (const { locator, expectedRoute } of this.options) {
      await locator.click();
      await this.page.waitForURL(`**/${expectedRoute}`);
      expect(this.page.url).toContain(expectedRoute);
    }
  }
}

export class MainNavOptionsMobile extends MainNavOptions {
  constructor(page: Page) {
    super(page);
    this.options.push({
      locator: page.locator("#home"),
      expectedRoute: "#home",
    });
  }
}

export class MainNavOptionsDesktop extends MainNavOptions {}
