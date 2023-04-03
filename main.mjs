#! /usr/bin/env node
import { ArgumentParser } from 'argparse';
import puppeteer from 'puppeteer';

const parser = new ArgumentParser({
  add_help: true,
  description: 'The fucking legend'
});

const viewports = {
  plein: { width: 980, height: 670 },
  demi: { width: 480, height: 670 },
  quartH: { width: 480, height: 325 },
  quartV: { width: 230, height: 670 },
  sixieme: { width: 480, height: 210 },
  doubleBigBox: { width: 300, height: 600 }
};

parser.add_argument(
  '-v', '--viewport',
  {
    help: `la taille de la capture`,
    choices: Object.keys(viewports),
    required: true
  }
);
parser.add_argument(
  '-f', '--file',
  {
    help: 'le html de la pub',
    default: 'index.html'
  }
);
parser.add_argument(
  '-q', '--quality',
  {
    help: 'la qualité de la capture',
    default: 40
  }
);
parser.add_argument(
  '-o', '--output',
  {
    help: 'le fichier de capture',
    default: "capture.jpg"
  }
);
const args = parser.parse_args();

(async () => {
  // 1. Launch the browser
  const browser = await puppeteer.launch({
    defaultViewport: viewports[args.viewport]
  });

  // 2. Open a new page
  const page = await browser.newPage();

  // 3. Navigate to URL
  await page.goto(`file://${args.file}`);

  const body = await page.$('body');

  // 4. Take screenshot
  await body.screenshot({ path: args.output, quality: args.quality });

  await browser.close();
})();
