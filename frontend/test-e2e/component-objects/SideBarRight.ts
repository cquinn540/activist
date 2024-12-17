import type { Locator, Page } from "playwright";
import { ThemeMenu } from "./ThemeMenu";
import { LanguageMenu } from "./LanguageMenu";
import { SignInMenu } from "./SignInMenu";

export class SideBarRight {
  public readonly root: Locator;

  constructor(page: Page) {
    this.root = page.locator("#drawer-navigation");
  }

  get closeButton() {
    return this.root.getByRole("button", {
      name: /expand or collapse the right sidebar/i,
    });
  }

  get themeMenu() {
    return new ThemeMenu(this.root.locator(".dropdown-theme"));
  }

  get languageMenu() {
    return new LanguageMenu(this.root.locator(".dropdown-language"));
  }

  get signInMenu() {
    return new SignInMenu(this.root.locator("#user-options"));
  }
}
