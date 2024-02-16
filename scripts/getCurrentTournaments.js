import 'dotenv/config';

import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

async function main() {
  const response = await fetch(process.env.REQUEST_URL, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      password: process.env.SHARKSCOPE_PASSWORD,
      username: process.env.SHARKSCOPE_USERNAME,
    },
  });
  writeFileSync(
    'sharkscope.json',
    await response.arrayBuffer().then(Buffer.from),
  );
}

main();
