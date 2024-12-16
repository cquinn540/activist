import { expect, test } from "../fixtures/test-fixtures";
import { runAccessibilityTest } from "../utils/accessibilityTesting";

test.describe("Home Page", () => {
  test("Topics filter should expand or hide on click", async ({ homePage }) => {
    const topicsFilter = homePage.getTopicsFilter();
    await topicsFilter.click();
    await expect(topicsFilter.getByRole("listbox")).toBeVisible();

    await topicsFilter.click();
    await expect(topicsFilter.getByRole("listbox")).toBeHidden();
  });

  test("SidebarLeft should expand and collapse on hover", async ({
    homePage,
  }) => {
    const isMobile = await homePage.isMobile();
    test.skip(isMobile, "SidebarLeft only shows on desktop");

    const sidebarLeft = homePage.getSidebarLeft();
    sidebarLeft.testExpandAndCollapse();
  });

  test("Navigation main options: Events, Organizations and Home", async ({
    homePage,
  }) => {
    const isMobile = await homePage.isMobile();
    const mainNavOptions = homePage.getMainNavOptions(isMobile);
    await mainNavOptions.testEachLink();
  });

  test("Navigation sub options: Info and Join activist", async ({
    homePage,
  }) => {
    const isMobile = await homePage.isMobile();
    const SubNavOptions = homePage.getSubNavOptions(isMobile);
    await SubNavOptions.testEachLink();
  });

  test("Hot keys should function correctly", async ({ homePage }) => {
    const isMobile = await homePage.isMobile();
    test.skip(isMobile, "This test is only for desktop");

    if (!isMobile) {
      const [
        isSearchInputFocused,
        isExpandedSearchInputVisible,
        isExpandedSearchInputHidden,
      ] = await homePage.checkHotKeyFunctionality();
      expect(isSearchInputFocused).toBe(true);
      expect(isExpandedSearchInputVisible).toBe(true);
      expect(isExpandedSearchInputHidden).toBe(true);
    }
  });

  test.skip("Search bar should be functional on both mobile and desktop", async ({
    homePage,
  }) => {
    const results = await homePage.checkSearchFunctionality();
    expect(results).toEqual([true, true, true, true]);
  });

  // MARK: Accessibility

  // Note: Check to make sure that this is eventually done for light and dark modes.
  test("Home Page has no detectable accessibility issues", async ({
    homePage,
  }, testInfo) => {
    const violations = await runAccessibilityTest(homePage, testInfo);
    expect.soft(violations, "Accessibility violations found:").toHaveLength(0);

    if (violations.length > 0) {
      console.log(
        "Accessibility violations:",
        JSON.stringify(violations, null, 2)
      );
    }
  });
});
