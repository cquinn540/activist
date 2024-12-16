import type { Locator, Page } from "@playwright/test";
import { newEntityMenu } from "./EntityMenu";

export const newEventMenu = (parent: Page | Locator) =>
  newEntityMenu(parent, "event");
