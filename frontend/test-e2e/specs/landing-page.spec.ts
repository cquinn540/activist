import type { LocaleCode, LocaleName } from "~/locales";
import {
  createLandingPage,
  LandingPageMobile,
  LandingPageWeb,
} from "../page-objects/LandingPage";
import { expect, test } from "../fixtures/test-fixtures";
import { runAccessibilityTest } from "../utils/accessibilityTesting";
import { ROADMAP_LINK_NAME } from "../utils/accessible-names";

test.beforeEach(({ page }) => {
  page.goto("/en");
});

test.describe("Landing Page", () => {
  // MARK: Landing Page

  test('Title should contain "activist"', async ({ page }) => {
    expect(page.title()).toContain("activist");
  });

  test.skip("Can request access", async ({ page }) => {
    const requestAccessLink = page.locator("#request-access");
    await expect(requestAccessLink).toHaveAttribute(
      "href",
      "https://app.formbricks.com/s/clvn9ywe21css8wqpt1hee57a"
    );
  });

  test("Can navigate to Organizations page", async ({ page }) => {
    const organizationsLink = page.getByRole("link", {
      name: /view the organizations section of the activist platform/i,
    });
    await organizationsLink.click();
    page.waitForURL("**/organizations");
    expect(page.url()).toContain("/organizations");
  });

  test("Can navigate to Events page", async ({ page }) => {
    const eventsLink = page.getByRole("link", {
      name: /view the events section of the activist platform/i,
    });
    await eventsLink.click();
    page.waitForURL("**/events");
    expect(page.url()).toContain("/events");
  });

  test("Important links have correct urls", async ({ page }) => {
    const links = [
      {
        name: /learn more about getting involved in an activist organization/i,
        url: "https://docs.activist.org/activist",
      },
      {
        name: /learn more about organizing an activist organization/i,
        url: "https://docs.activist.org/activist",
      },
      {
        name: /learn more about growing an activist organization/i,
        url: "https://docs.activist.org/activist",
      },
      {
        name: /learn more about activist\.org and how it functions/i,
        url: "https://docs.activist.org/activist",
      },
      {
        name: /become a supporter of activist/i,
        url: "/supporters/join",
      },
      {
        name: /view all supporters of activist/i,
        url: "https://docs.activist.org/activist/organization/community/supporters",
      },
    ];

    for (const { name, url } of links) {
      const link = page.getByRole("link", { name });
      await expect(link).toHaveAttribute("href", url);
    }
  });

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

    expect(page.url()).toContain("/about/roadmap");
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

    expect(page.url()).toContain("/auth/sign-in");
  });

  test("Can navigate to Sign Up page", async ({ page, isMobile }) => {
    const landingPage = createLandingPage(page, isMobile);

    await landingPage.header.clickSignUpLink();
    await page.waitForURL("**/auth/sign-up");

    expect(page.url()).toContain("/auth/sign-up");
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
        "Theme menu should be open"
      ).toBeVisible();
      await getOption().click();
      await landingPage.expectTheme(theme);
    }
  });

  test("Can change language", async ({ page, isMobile }) => {
    const landingPage = createLandingPage(page, isMobile);

    const languages: {
      path: LocaleCode;
      headingText: string;
      option: LocaleName;
    }[] = [
      {
        path: "es",
        headingText: "Donde emepezamos.",
        option: "Español",
      },

      {
        path: "de",
        headingText: "Wo wir anfangen.",
        option: "Deutsch",
      },
      {
        path: "fr",
        headingText: "Notre point de départ.",
        option: "Français",
      },
      {
        path: "pt",
        headingText: "Onde nós começamos.",
        option: "Português",
      },
      {
        path: "en",
        headingText: "Where we start.",
        option: "English",
      },
    ];

    for (let i = 0; i < languages.length; i += 1) {
      const { path, headingText, option } = languages[i];

      const languageMenu = await landingPage.header.getLanguageMenu();
      await languageMenu.toggleOpenButton.click();

      const firstOption =
        i === 0
          ? languageMenu.getOption("Deutsch")
          : languageMenu.getOption("English");
      await expect(firstOption, "Language menu should be open").toBeVisible();

      await languageMenu.getOption(option).click();

      await page.waitForURL(`**/${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        headingText
      );
    }
  });

  // MARK: Accessibility

  // Note: Check to make sure that this is eventually done for light and dark modes.
  test("Landing Page has no detectable accessibility issues", async ({
    page,
  }, testInfo) => {
    const violations = await runAccessibilityTest(
      "Landing Page",
      page,
      testInfo
    );
    expect.soft(violations, "Accessibility violations found:").toHaveLength(0);

    if (violations.length > 0) {
      console.log(
        "Accessibility violations:",
        JSON.stringify(violations, null, 2)
      );
    }
  });
});
