import { sendMessageToSubscribers } from "./bot.mjs";
import { page } from "./browser.mjs";
import { applyButtonSelector, timeout } from "./config.mjs";
import { saveScreenshot } from "./debug.mjs";

const checkStatus = async () =>
  !(await page.locator(applyButtonSelector).isDisabled());

let prevStatus = false;
while (true) {
  await page.waitForTimeout(timeout);
  const status = await checkStatus();
  await saveScreenshot(page);

  if (status !== prevStatus) {
    if (status) {
      await sendMessageToSubscribers("🟢 Job is available");
    } else {
      await sendMessageToSubscribers("🔴 Job Posting is closed");
    }
    prevStatus = status;
  }

  await page.reload();
}
