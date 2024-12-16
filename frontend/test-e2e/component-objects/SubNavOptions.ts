import type { Page, Locator } from "playwright";

interface Option {
  submenu: Locator;
  locator: Locator;
  expectedRoute: string;
}

export abstract class SubNavOptions {
  public page: Page;
  public infoSubmenu: Locator;
  public userSubmenu: Locator;
  protected options: Option[];

  constructor(page: Page) {
    this.page = page;
    this.infoSubmenu = page.locator("#info button");
    this.userSubmenu = page.locator("#user-options button");
    this.options = [
      {
        submenu: this.infoSubmenu,
        locator: page.locator("#help"),
        expectedRoute: "help",
      },
      {
        submenu: this.infoSubmenu,
        locator: page.locator("#docs"),
        expectedRoute: "docs",
      },
      {
        submenu: this.infoSubmenu,
        locator: page.locator("#legal"),
        expectedRoute: "legal",
      },
      {
        submenu: this.userSubmenu,
        locator: page.locator("#sign-in"),
        expectedRoute: "auth/sign-in",
      },
      {
        submenu: this.userSubmenu,
        locator: page.locator("#sign-in"),
        expectedRoute: "auth/sign-up",
      },
    ];
  }

  protected async testOption({ submenu, locator, expectedRoute }: Option) {
    await submenu.click();
    await locator.click();
    await this.page.waitForURL(`**/${expectedRoute}`);
    expect(this.page.url).toContain(expectedRoute);
    await this.page.goBack();
  }

  public async testEachLink() {
    this.options.forEach(this.testOption);
  }
}

export class SubNavOptionsMobile extends SubNavOptions {
  public openDrawerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.openDrawerButton = page.locator("#sidebar-right-hamburger:visible");
  }

  public override async testOption(option: Option): Promise<void> {
    await this.openDrawerButton.click();
    await super.testOption(option);
  }
}

export class SubNavOptionsDesktop extends SubNavOptions {}
