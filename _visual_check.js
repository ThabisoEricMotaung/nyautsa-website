const { chromium } = require("playwright");
const path = require("path");

const OUT = process.env.SHOT_DIR || __dirname;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
      console.log("CONSOLE_ERR", msg.text());
    }
  });
  page.on("pageerror", (err) => {
    console.log("PAGE_ERROR", String(err));
    errors.push(String(err));
  });
  page.on("response", (res) => {
    if (res.status() >= 400) console.log("HTTP_ERR", res.status(), res.url());
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.reload({ waitUntil: "networkidle" });

  await page.screenshot({ path: path.join(OUT, "hero-normal.png"), clip: { x: 0, y: 0, width: 1400, height: 900 } });

  const allLinks = await page.locator("a").allTextContents();
  console.log("ALL_LINK_TEXT", JSON.stringify(allLinks));

  const callBtn = page.locator('a:has-text("Call +27 68 446 1635")').first();
  await callBtn.hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "hero-hover.png"), clip: { x: 0, y: 0, width: 1400, height: 900 } });

  const outlineBtn = page.getByRole("link", { name: /View recent work/ });
  await outlineBtn.hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "hero-outline-hover.png"), clip: { x: 0, y: 0, width: 1400, height: 900 } });

  await page.locator("#project-map").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  console.log("PROJECT_MAP_HTML", await page.locator("#project-map").innerHTML());
  await page.screenshot({ path: path.join(OUT, "map-debug.png") });
  await page.waitForSelector(".leaflet-container", { timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, "map-section.png") });

  const markers = page.locator(".nyautsa-map-marker");
  const count = await markers.count();
  console.log("MARKER_COUNT", count);

  if (count > 0) {
    await markers.nth(1).click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, "map-after-marker-click.png") });
    console.log("URL_AFTER_MARKER_CLICK", page.url());
    console.log("SCROLL_Y_AFTER_MARKER_CLICK", await page.evaluate(() => window.scrollY));
  }

  await page.locator("#project-map").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const listItems = page.locator('a[href^="#"]', { hasText: "Danville" });
  if (await listItems.count() > 0) {
    await listItems.first().click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, "map-after-list-click.png") });
  }

  console.log("CONSOLE_ERRORS", JSON.stringify(errors));

  await browser.close();
})();
