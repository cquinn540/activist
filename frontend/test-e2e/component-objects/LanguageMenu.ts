import type { Locator } from "playwright";
import type { LocaleName } from "~/locales";

export class LanguageMenu {
  public readonly root: Locator;
  public readonly toggleOpenButton: Locator;

  constructor(locator: Locator) {
    this.root = locator;
    this.toggleOpenButton = this.root.getByRole("button", {
      name: /open a dropdown to select another language/i,
    });
  }

  getOption(name: LocaleName): Locator {
    return this.root.getByRole("menuitem", {
      name: name,
    });
  }
}
