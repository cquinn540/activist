import type { Locator } from "playwright";

export class LanguageMenu {
  public readonly root: Locator;
  public readonly toggleOpenButton: Locator;

  constructor(locator: Locator) {
    this.root = locator;
    this.toggleOpenButton = this.root.getByRole("button", {
      name: /open a dropdown to select another language/i,
    });
  }

  get germanOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /deutsch/i,
    });
  }

  get spanishOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /español/i,
    });
  }

  get frenchOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /français/i,
    });
  }

  get portugueseOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /português/i,
    });
  }
}
