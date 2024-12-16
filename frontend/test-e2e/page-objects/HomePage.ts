import type { Locator, Page } from "@playwright/test";
import PageObjectBase from "../utils/PageObjectBase";
import { HeaderWebsite } from "../component-objects/HeaderWebsite";
import { SidebarLeft } from "../component-objects/SidebarLeft";
import { Navigation } from "../component-objects/Navigation";
import {
  MainNavOptions,
  MainNavOptionsDesktop,
  MainNavOptionsMobile,
} from "../component-objects/MainNavOptions";
import {
  SubNavOptions,
  SubNavOptionsMobile,
  SubNavOptionsDesktop,
} from "../component-objects/SubNavOptions";

export class HomePage extends PageObjectBase {
  readonly header: HeaderWebsite;
  readonly navigation: Navigation;

  constructor(page: Page) {
    super(page, "Home Page", "/home");
    this.header = new HeaderWebsite(page);
    this.navigation = new Navigation(page);
  }

  getHeading(): Locator {
    return this.page.getByRole("heading", { level: 1 });
  }

  getTopicsFilter(): Locator {
    return this.page.locator("#topics-dropdown");
  }

  getSidebarLeft(): SidebarLeft {
    return new SidebarLeft(this.page.locator(SidebarLeft.ID), this.page);
  }

  getMainNavOptions(isMobile: boolean): MainNavOptions {
    return isMobile
      ? new MainNavOptionsMobile(this.page)
      : new MainNavOptionsDesktop(this.page);
  }

  getSubNavOptions(isMobile: boolean): SubNavOptions {
    return isMobile
      ? new SubNavOptionsMobile(this.page)
      : new SubNavOptionsDesktop(this.page);
  }

  async checkHotKeyFunctionality(): Promise<[boolean, boolean, boolean]> {
    await this.header.searchBar.pressSlashKey();
    const isSearchInputFocused =
      await this.header.searchBar.isSearchInputFocused();

    await this.header.searchBar.pressCommandOrControlK();
    const isExpandedSearchInputVisible =
      await this.header.searchBar.isSearchModalVisible();

    await this.header.searchBar.clickCloseSearchModal();
    const isExpandedSearchInputHidden =
      !(await this.header.searchBar.isSearchModalVisible());

    return [
      isSearchInputFocused,
      isExpandedSearchInputVisible,
      isExpandedSearchInputHidden,
    ];
  }

  async checkSearchFunctionality(): Promise<boolean[]> {
    const results: boolean[] = [];
    const isMobile = await this.isMobile();

    // Check if search toggle/input is visible
    results.push(
      isMobile
        ? await this.header.searchBar.searchToggle.isVisible()
        : await this.header.searchBar.search.isVisible()
    );

    // Open search input
    await this.header.searchBar.openSearchInput();

    // Check if search input is visible
    results.push(await this.header.searchBar.isSearchInputVisible());

    // Fill search input
    await this.header.searchBar.fillSearchInput("test search");

    // Check if search input has correct value
    const inputValue = await this.header.searchBar.searchInput.inputValue();
    results.push(inputValue === "test search");

    // Close search
    if (!isMobile) {
      await this.sidebarLeft.collapseSidebar();
    }
    await this.header.searchBar.closeSearchInput();

    // Check if search input is hidden
    results.push(!(await this.header.searchBar.isSearchInputVisible()));

    return results;
  }
}
