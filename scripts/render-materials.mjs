import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const browser = await chromium.launch();

// Render poster
console.log('Rendering A4 poster...');
const posterPage = await browser.newPage();
await posterPage.setViewportSize({ width: 2480, height: 3508 });
await posterPage.goto(`file://${path.resolve(__dirname, 'poster.html')}`, { waitUntil: 'networkidle' });
// Wait for fonts to load
await posterPage.waitForTimeout(2000);
await posterPage.screenshot({
  path: path.join(publicDir, 'lighthouse-poster.png'),
  fullPage: false,
  type: 'png',
});
console.log('Poster saved to public/lighthouse-poster.png');
await posterPage.close();

// Render clinical summary
console.log('Rendering clinical summary...');
const summaryPage = await browser.newPage();
await summaryPage.setViewportSize({ width: 2480, height: 3508 });
await summaryPage.goto(`file://${path.resolve(__dirname, 'clinical-summary.html')}`, { waitUntil: 'networkidle' });
await summaryPage.waitForTimeout(2000);
await summaryPage.screenshot({
  path: path.join(publicDir, 'lighthouse-clinical-summary.png'),
  fullPage: false,
  type: 'png',
});
console.log('Clinical summary saved to public/lighthouse-clinical-summary.png');
await summaryPage.close();

await browser.close();
console.log('All materials rendered successfully.');
