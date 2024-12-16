import type { Page } from "@playwright/test";

export const newHomePage = (page: Page) => ({
  heading: page.getByRole("heading", { level: 1 }),
  topicsFilter: page.locator("#topics-dropdown"),
});
