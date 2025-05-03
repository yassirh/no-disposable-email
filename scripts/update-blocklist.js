// scripts/update-blocklist.js
// Downloads the latest disposable_email_blocklist.conf from the official GitHub repo
const https = require('https');
const fs = require('fs');
const url = 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf';
const dest = 'disposable_email_blocklist.conf';

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download: ${res.statusCode}`);
    res.resume();
    process.exit(1);
  }
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log(`Downloaded latest blocklist to ${dest}`);
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
