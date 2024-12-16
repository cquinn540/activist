import type { Page, Locator } from "@playwright/test";
import { expect } from "~/test-e2e/fixtures/test-fixtures";

export class SidebarLeft {
  public static ID: "#sidebar-left";

  public readonly locator: Locator;
  public readonly lockToggle: Locator;
  private readonly page;

  constructor(locator: Locator, page: Page) {
    this.locator = locator;
    this.page = page;
    this.lockToggle = this.locator.getByRole("button", {
      name: /expand or collapse the left sidebar/i,
    });
  }

  async isCollapsed(message?: string): Promise<void> {
    await expect(this.locator, message).toHaveClass("w-16");
  }

  async isExpanded(message?: string): Promise<void> {
    await expect(this.locator, message).toHaveClass("w-50");
  }

  async isLockedOpen(message?: string): Promise<void> {
    await expect(this.locator, message).toHaveClass("-rotate-180");
  }

  async isUnlocked(message?: string): Promise<void> {
    await expect(this.locator, message).not.toHaveClass("-rotate-180");
  }

  async hover(): Promise<void> {
    await this.locator.hover();
  }

  async mouseEnter(): Promise<void> {
    // determine the the width of the visible sidebar
    const boundingBox = await this.locator.boundingBox();
    const x = boundingBox?.x ?? 0;
    const y = boundingBox?.y ?? 0;
    // move mouse to the center of the sidebar
    await this.page.mouse.move(x / 2, y / 2);
  }

  // hover to the right of the sidebar left
  async mouseLeave(): Promise<void> {
    const boundingBox = await this.locator.boundingBox();
    if (!boundingBox) {
      throw new Error("Unable to get bounding box of SidebarLeft");
    }

    const { x, y, width, height } = boundingBox;

    // Move the mouse to the right of the sidebar
    const outsideX = x + width + 10; // 10 pixels to the right of the sidebar
    const outsideY = y + height / 2; // Vertically centered

    await this.page.mouse.move(outsideX, outsideY);
  }

  async testExpandAndCollapse() {
    await this.isCollapsed("should be collapsed by default");

    await this.mouseEnter();
    await this.isExpanded("should expand on mouse enter");

    await this.lockToggle.click();
    await this.mouseLeave();
    await this.isLockedOpen("lock toggle button should point left when locked");
    await this.isExpanded("should stay expanded on mouse leave when locked");

    await this.mouseEnter();
    await this.lockToggle.click();
    await this.isUnlocked(
      "lock toggle button should point right when unlocked"
    );

    await this.mouseLeave();
    await this.isCollapsed("should collapse on mouse leave when unlocked");
  }
}
