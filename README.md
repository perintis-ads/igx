# IGX

Instagram viewer and analytics platform

## Installation
```bash
npm install
```

## Usage
```bash
# Cloudflare workers dev
npm run dev

# Cloudflare workers local
npm run local

# https://127.0.0.1:8787
```

## Deployment
Manually upload to Cloudflare
```bash
# Staging
# https://staging.gramica.online
npm run deploy:staging

# Production
# https://staging.gramica.online
npm run deploy:prod
```

CI/CD to cloudflare
Upload automatically to Cloudflare
replace origin tags : "staging" or "production"
push to repo, and happy back to browser
