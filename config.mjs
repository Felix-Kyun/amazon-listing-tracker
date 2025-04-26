import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const token = process.env.TELEGRAM_BOT_TOKEN;
export const timeout = Number(process.env.TIMEOUT) ?? 5000;
export const headless = Boolean(process.env.HEADLESS) ?? false;
export const url =
  "https://www.jobsatamazon.co.uk/app#/jobDetail?jobId=JOB-UK-0000000121&locale=en-GB";
export const closeSignupModalSelector = '[data-test-id="sortCloseModal"]';
export const applyButtonSelector =
  '[data-test-id="jobDetailApplyButtonDesktop"]';
