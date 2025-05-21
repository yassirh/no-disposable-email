const express = require('express');
const { isDisposable } = require('./utility');

const app = express();
const port = process.env.PORT || 3000;

app.get('/check', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Missing email parameter' });
  }
  // Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  res.json({
    email,
    disposable: isDisposable(email)
  });
});

app.get('/heartbeat', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(port, () => {
  console.log(`Disposable domain API listening at http://localhost:${port}`);
});

module.exports = { app, server };