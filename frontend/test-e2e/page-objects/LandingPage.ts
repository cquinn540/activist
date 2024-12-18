import type { Page } from "@playwright/test";
import locales from "../../locales";
import PageObjectBase from "../utils/PageObjectBase";
import {
  LandingHeaderMobile,
  LandingHeaderWeb,
  type LandingHeader,
} from "../component-objects/LandingHeader";

export interface LandingPage extends PageObjectBase {
  header: LandingHeader;
}

export class LandingPageWeb extends PageObjectBase implements LandingPage {
  public readonly header: LandingHeaderWeb;

  constructor(page: Page) {
    super(page);
    this.header = new LandingHeaderWeb(page);
  }
}

export class LandingPageMobile extends PageObjectBase implements LandingPage {
  public readonly header: LandingHeaderMobile;

  constructor(page: Page) {
    super(page);
    this.header = new LandingHeaderMobile(page);
  }
}

export function createLandingPage(page: Page, isMobile: boolean): LandingPage {
  return isMobile ? new LandingPageMobile(page) : new LandingPageWeb(page);
}
