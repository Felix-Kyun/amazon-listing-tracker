import { chromium, selectors } from "playwright";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

// config
const token = process.env.TELEGRAM_BOT_TOKEN;
const timeout = process.env.TIMEOUT || 5000;
const url =
  "https://www.jobsatamazon.co.uk/app#/jobDetail?jobId=JOB-UK-0000000121&locale=en-GB";
const closeSignupModalSelector = '[data-test-id="sortCloseModal"]';
const applyButtonSelector = '[data-test-id="jobDetailApplyButtonDesktop"]';

// bot setup
const bot = new TelegramBot(token, {
  polling: true,
});
const subscribedUsers = new Set();

// chromium setup
const browser = await chromium.launch({
  headless: false,
});

const context = await browser.newContext({
  permissions: [],
});

const page = await context.newPage();

/* await page.goto("https://jobsatamazon.co.uk"); */
await page.goto(url);

// accept cookies
await page
  .getByRole("button", {
    name: "Accept all",
    // name: "Customise",
    exact: false,
  })
  .click();

// close sign up thing
await page.locator(closeSignupModalSelector).locator("..").click();

// apply button
const applyButton = await page.locator(applyButtonSelector);

const checkStatus = async () => !applyButton.isDisabled();

while (!(await checkStatus())) {
  console.log("reloading page");
  await page.reload();
  await page.waitForTimeout(5000);
}

console.log("button enabled");
