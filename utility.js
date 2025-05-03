const fs = require('fs');
const path = require('path');

let disposableDomains = null;

function loadDisposableDomains() {
  if (disposableDomains) return disposableDomains;
  const filePath = path.join(__dirname, 'disposable_email_blocklist.conf');
  if (!fs.existsSync(filePath)) return [];
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  disposableDomains = lines.map(l => l.trim().toLowerCase()).filter(Boolean);
  return disposableDomains;
}

function isDisposable(email) {
  const domains = loadDisposableDomains();
  const domain = email.split('@')[1]?.toLowerCase();
  return domains.includes(domain);
}

module.exports = { isDisposable };