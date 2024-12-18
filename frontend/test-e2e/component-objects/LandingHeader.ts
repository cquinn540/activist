import type { Locator, Page } from "playwright";
import { expect } from "@playwright/test";

import { ThemeMenu } from "./ThemeMenu";
import { LanguageMenu } from "./LanguageMenu";
import { SideBarRight } from "./SideBarRight";

import { ROADMAP_LINK_NAME } from "../utils/accessible-names";

export interface LandingHeader {
  clickSignInLink: () => Promise<void>;
  clickSignUpLink: () => Promise<void>;
  getThemeMenu: () => Promise<ThemeMenu>;
  getLanguageMenu: () => Promise<LanguageMenu>;
}

const ACTIVIST_LANDING_LINK_NAME =
  /the activist logo that links to the home page/i;

const SIGN_IN_LINK_NAME = /sign in to your account/i;
const SIGN_UP_LINK_NAME = /sign up for a new account/i;

export class LandingHeaderWeb implements LandingHeader {
  public readonly root: Locator;
  public readonly activistLandingLink: Locator;
  public readonly roadmapLink: Locator;
  public readonly themeMenu: ThemeMenu;
  public readonly languageMenu: LanguageMenu;
  public readonly signInLink: Locator;
  public readonly signUpLink: Locator;

  constructor(page: Page) {
    this.root = page.locator("#desktop-header");
    this.activistLandingLink = this.root.getByRole("link", {
      name: ACTIVIST_LANDING_LINK_NAME,
    });
    this.roadmapLink = this.root.getByRole("link", {
      name: ROADMAP_LINK_NAME,
    });

    this.themeMenu = new ThemeMenu(this.root.locator(".dropdown-theme"));
    this.languageMenu = new LanguageMenu(
      this.root.locator(".dropdown-language")
    );

    this.signInLink = this.root.getByRole("link", {
      name: SIGN_IN_LINK_NAME,
    });
    this.signUpLink = this.root.getByRole("link", {
      name: SIGN_UP_LINK_NAME,
    });
  }

  async clickSignInLink() {
    await this.signInLink.click();
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async getThemeMenu(): Promise<ThemeMenu> {
    return new Promise(() => this.themeMenu);
  }

  async getLanguageMenu(): Promise<LanguageMenu> {
    return new Promise(() => this.languageMenu);
  }
}

export class LandingHeaderMobile implements LandingHeader {
  private readonly page;
  public readonly root: Locator;
  public readonly activistLandingLink: Locator;
  public readonly openSideBarRightButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("#mobile-header");
    this.activistLandingLink = this.root.getByRole("link", {
      name: ACTIVIST_LANDING_LINK_NAME,
    });
    this.openSideBarRightButton = this.root.getByRole("button", {
      name: /expand or collapse the right sidebar/i,
    });
  }

  get sideBarRight() {
    return new SideBarRight(this.page);
  }

  async openSideBar(): Promise<SideBarRight> {
    await this.openSideBarRightButton.click();
    const sidebar = this.sideBarRight;
    await expect(sidebar.root, "right side bar should be open").toBeVisible();
    return sidebar;
  }

  async clickSignInLink() {
    const sidebar = await this.openSideBar();
    const signInMenu = sidebar.signInMenu;
    await signInMenu.toggleOpenButton.click();
    const signInOption = signInMenu.signInOption;
    await expect(signInOption, "sign in menu should be open").toBeVisible();
    await signInOption.click();
  }

  async clickSignUpLink() {
    const sidebar = await this.openSideBar();
    const signInMenu = sidebar.signInMenu;
    await signInMenu.toggleOpenButton.click();
    const signUpOption = signInMenu.signUpOption;
    await expect(signUpOption, "sign in menu should be open").toBeVisible();
    await signUpOption.click();
  }

  async getThemeMenu() {
    const sidebar = await this.openSideBar();
    return sidebar.themeMenu;
  }

  async getLanguageMenu() {
    const sidebar = await this.openSideBar();
    return sidebar.languageMenu;
  }
}
