export const saveScreenshot = (() => {
  let counter = 0;
  return async (page) => {
    await page.screenshot({
      path: `./debug/debug-${counter++}.png`,
      fullPage: true,
    });
  };
})();
