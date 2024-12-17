import type { Locator } from "playwright";

export class SignInMenu {
  public readonly root: Locator;
  public readonly toggleOpenButton: Locator;

  constructor(locator: Locator) {
    this.root = locator;
    this.toggleOpenButton = this.root.getByRole("button", {
      name: /open to see user specific options/i,
    });
  }

  get signInOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /sign in/i,
    });
  }

  get signUpOption(): Locator {
    return this.root.getByRole("menuitem", {
      name: /sign up/i,
    });
  }
}
