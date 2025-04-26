import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: false,
});
const context = await browser.newContext({
  permissions: [],
});
const page = await context.newPage();

/* await page.goto("https://jobsatamazon.co.uk"); */
await page.goto(
  "https://www.jobsatamazon.co.uk/app#/jobDetail?jobId=JOB-UK-0000000121&locale=en-GB",
);

await page
  .getByRole("button", {
    name: "Accept all",
    exact: false,
  })
  .click();

await page.locator('[data-test-id="sortCloseModal"]').locator("..").click();

await page
  .locator("[data-test-component='MessageBannerDismissButton']")
  .click();

const applyButton = await page.locator(
  '[data-test-id="jobDetailApplyButtonDesktop"]',
);

const checkStatus = async () => !applyButton.isDisabled();

while (!(await checkStatus())) {
  console.log("reloading page");
  await page.reload();
  await page.waitForTimeout(5000);
}

console.log("button enabled");
