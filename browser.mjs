import { chromium, firefox } from "playwright";
import { url, closeSignupModalSelector, headless } from "./config.mjs";

const browser = await firefox.launch({
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

console.log("Page loaded");
export { page };
