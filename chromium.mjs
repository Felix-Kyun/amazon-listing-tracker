import { chromium } from "playwright";
import { url, closeSignupModalSelector, headless } from "./config.mjs";

// chromium setup
const browser = await chromium.launch({
  headless,
});

const context = await browser.newContext({
  permissions: [],
});

const page = await context.newPage();

await page.goto(url);

// accept cookies
await page
  .getByRole("button", {
    name: "Accept all",
    // name: "Customise",
    exact: false,
  })
  .click();

// close sign up thingy
await page.locator(closeSignupModalSelector).locator("..").click();

export { page };
