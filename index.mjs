import { sendMessageToSubscribers } from "./bot.mjs";
import { page } from "./chromium.mjs";
import { applyButtonSelector, timeout } from "./config.mjs";

const applyButton = page.locator(applyButtonSelector);
const checkStatus = async () => !applyButton.isDisabled();

let prevStatus = false;
while (true) {
  const status = await checkStatus();

  if (status !== prevStatus) {
    if (status) {
      await sendMessageToSubscribers("🟢 Job is available");
    } else {
      await sendMessageToSubscribers("🔴 Job Posting is closed");
    }
    prevStatus = status;
  }

  await page.waitForTimeout(timeout);
  await page.reload();
}
