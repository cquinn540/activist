import {
  createLandingPage,
  LandingPageMobile,
  LandingPageWeb,
} from "../page-objects/LandingPage";
import { LandingPage, expect, test } from "../fixtures/test-fixtures";
import { runAccessibilityTest } from "../utils/accessibilityTesting";
import { ROADMAP_LINK_NAME } from "../utils/accessible-names";

test.beforeEach(({ page }) => {
  page.goto("/en");
});

test.describe("Landing Page", () => {
  // MARK: Header

  test("Desktop layout uses desktop header", async ({ page, isMobile }) => {
    test.skip(isMobile);
    const landingPage = new LandingPageWeb(page);

    expect(landingPage.header.root).toBeVisible();
  });

  test("Mobile layout uses mobile header", async ({ page, isMobile }) => {
    test.skip(!isMobile);
    const landingPage = new LandingPageMobile(page);

    expect(landingPage.header.root).toBeVisible();
  });

  test("Can navigate to Roadmap on desktop", async ({ page, isMobile }) => {
    test.skip(isMobile);
    const landingPage = new LandingPageWeb(page);

    await landingPage.header.roadmapLink.click();
    await page.waitForURL("**/about/roadmap");

    expect(page.url).toContain("/about/roadmap");
  });

  test("Roadmap link is not visible on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile);

    expect(
      page.getByRole("link", { name: ROADMAP_LINK_NAME })
    ).not.toBeAttached();
  });

  test("Can navigate to Sign In page", async ({ page, isMobile }) => {
    const landingPage = createLandingPage(page, isMobile);

    await landingPage.header.clickSignInLink();
    await page.waitForURL("**/auth/sign-in");

    expect(page.url).toContain("/auth/sign-in");
  });

  test("Can navigate to Sign Up page", async ({ page, isMobile }) => {
    const landingPage = createLandingPage(page, isMobile);

    await landingPage.header.clickSignUpLink();
    await page.waitForURL("**/auth/sign-up");

    expect(page.url).toContain("/auth/sign-up");
  });

  test("Can change themes", async ({ page, isMobile }) => {
    const landingPage = createLandingPage(page, isMobile);
    const themeMenu = await landingPage.header.getThemeMenu();

    const themes = [
      {
        theme: "light",
        getOption: themeMenu.getLightThemeOption,
      },
      {
        theme: "dark",
        getOption: themeMenu.getDarkThemeOption,
      },
    ];

    for (const { theme, getOption } of themes) {
      await themeMenu.toggleOpenButton.click();
      await expect(
        themeMenu.getSystemThemeOption(),
        "theme menu should be open"
      ).toBeVisible();
      await getOption().click();
      await landingPage.expectTheme(theme);
    }
  });

  // Test that the language dropdown is visible and functional.
  test("Language dropdown options are visible", async ({ landingPage }) => {
    const visibleOptions = await landingPage.getVisibleLanguageOptions();
    expect(visibleOptions.length).toBeGreaterThan(0);
    for (const option of visibleOptions) {
      await expect(option).toBeVisible();
    }
  });

  // MARK: Landing Page

  // Test that the title of the landing page contains "activist".
  test('Title should contain "activist"', async ({ landingPage }) => {
    const pageTitle = await landingPage.title();
    expect(pageTitle).toContain("activist");
  });

  // Test that the landing page contains the request access link.
  test.skip("Splash should contain the request access link", async ({
    landingPage,
  }) => {
    const requestAccessLink = landingPage.requestAccessLink;
    expect(await requestAccessLink.getAttribute("href")).toBe(
      LandingPage.urls.REQUEST_ACCESS_URL
    );
  });

  // Test that the view organizations button is visible and navigates to the organizations page.
  test("View organizations button should be visible and functional", async ({
    landingPage,
  }) => {
    const isVisible = await landingPage.isViewOrganizationsButtonVisible();
    expect(isVisible).toBe(true);

    await landingPage.navigateToViewOrganizations();
    expect(landingPage.url()).toContain("/organizations");
  });

  // Test that the view events button is visible and navigates to the events page.
  test("View events button should be visible and functional", async ({
    landingPage,
  }) => {
    const isVisible = await landingPage.isViewEventsButtonVisible();
    expect(isVisible).toBe(true);

    await landingPage.navigateToViewEvents();
    expect(landingPage.url()).toContain("/events");
  });

  // Test that all important links are visible on the landing page.
  test("All important links should be visible on the landing page", async ({
    landingPage,
  }) => {
    const importantLinks = await landingPage.getImportantLinks();
    for (const link of importantLinks) {
      await expect(link).toBeVisible();
    }
  });

  // MARK: Accessibility

  // Note: Check to make sure that this is eventually done for light and dark modes.
  test("Landing Page has no detectable accessibility issues", async ({
    landingPage,
  }, testInfo) => {
    const violations = await runAccessibilityTest(landingPage, testInfo);
    expect.soft(violations, "Accessibility violations found:").toHaveLength(0);

    if (violations.length > 0) {
      console.log(
        "Accessibility violations:",
        JSON.stringify(violations, null, 2)
      );
    }
  });
});
