import type { Locator } from "playwright";

export class ThemeMenu {
  public readonly root: Locator;
  public readonly toggleOpenButton: Locator;

  constructor(locator: Locator) {
    this.root = locator;
    this.toggleOpenButton = this.root.getByRole("button", {
      name: /open the dropdown to select another theme/i,
    });
  }

  getSystemThemeOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /switch to the system color mode/i,
    });
  }

  getLightThemeOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /switch to light mode/i,
    });
  }

  getDarkThemeOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /switch to dark mode/i,
    });
  }
}
