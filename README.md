# no-disposable-email

[![CI](https://github.com/yassirh/no-disposable-email/actions/workflows/ci.yml/badge.svg)](https://github.com/yassirh/no-disposable-email/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/no-disposable-email.svg?style=flat)](https://www.npmjs.com/package/no-disposable-email)
![NPM Downloads](https://img.shields.io/npm/dt/no-disposable-email?logo=npm)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://hub.docker.com/r/yassirh/no-disposable-email)

A fast, reliable tool to check if an email address uses a disposable domain. Includes an Express API, CLI, and utility function. Perfect for validation in web apps, and scripts.

---

## Table of Contents
- [Features](#features)
- [Demo](@demo)
- [Installation](#installation)
- [Usage](#usage)
  - [API](#api)
  - [CLI](#cli)
  - [Utility Function](#utility-function)
- [Docker](#docker)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- 🚀 Express API: `/check?email=...` endpoint
- 🛠️ CLI: `npx no-disposable-email <email>`
- 🧩 Utility: `isDisposable(email)`
- 🐳 Docker support
- ⚡ Domains are regularly updated from https://github.com/disposable-email-domains/disposable-email-domains/blob/main/disposable_email_blocklist.conf

---

## Demo

Try it online ![UptimeObserver uptime ratio (30 days)](https://img.shields.io/uptimeobserver/ratio/6528ee0f46f74cc2b71a9b89550da0141985)
:  
[Is Disposable Email API](https://uptimeobserver.com/api/free-tools/is-disposable-email?email=foo@mailinator.com)  or 
[Is Disposable Email GUI](http://uptimeobserver.com/free-tools/disposable-email-checker/)

---

## Installation

### NPM (CLI & Utility)
```sh
npm install no-disposable-email
```

### Clone & Run Locally
```sh
git clone https://github.com/yassirh/no-disposable-email.git

cd no-disposable-email

npm install
```

---

## Usage

### API
Start the server:
```sh
node index.js
```

Check an email:
```sh
curl 'http://localhost:3000/check?email=foo@mailinator.com'
```
Response:
```json
{
  "email": "foo@mailinator.com",
  "disposable": true
}
```

### CLI
```sh
npx no-disposable-email foo@mailinator.com
# or if installed globally
no-disposable-email foo@mailinator.com
```

### Utility Function
```js
const { isDisposable } = require('no-disposable-email');

console.log(isDisposable('foo@mailinator.com')); // true or false
```

### Heartbeat Endpoint

A simple health check endpoint is available:

```sh
GET /heartbeat
```

Response:
```json
{
  "status": "ok"
}
```

You can use this to verify the service is running (e.g., for Docker health checks or uptime monitoring).

---

## Docker


### Running with Docker

To run the service using Docker:

Start the container, mapping port 3000 inside the container to port 3000 on your host:
   ```sh
   docker run -d -p 3000:3000 yassirh/no-disposable-email
   ```

The API will be available at: [http://localhost:3000/check?email=foo@mailinator.com](http://localhost:3000/check?email=foo@mailinator.com)

### Build and run with Docker:
```sh
docker build -t no-disposable-email .

docker run -p 3000:3000 no-disposable-email
```

### Multi-Architecture Image for Docker Hub
To build and push a multi-architecture image to Docker Hub:
```sh

docker buildx create --use
# Build for amd64, arm64, and arm/v7 (Raspberry Pi, etc)
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t yassirh/no-disposable-email:latest --push .
```

---

## Updating the Blocklist

To update the list of disposable domains to the latest version from the official source, run:

```sh
npm run update-blocklist
```

This will download the latest `disposable_email_blocklist.conf` from the upstream repository.

---

## Development
- Add domains to `disposable_email_blocklist.conf` (one per line)
- Run tests:
```sh
npm test
```

---

## Contributing
Pull requests welcome! For major changes, open an issue first to discuss what you would like to change.

---

## License
You can copy, modify, distribute and use the work, even for commercial purposes, all without asking permission.

[![Licensed under CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/) 

---


