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

## Example
```bash

# GET SESSION
curl --location 'https://127.0.0.1:8787/admin/session' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' -k

# SAVE COOKIES SESSION
curl --location --request PUT 'https://127.0.0.1:8787/admin/session' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' \
--header 'Content-Type: application/json' \
--data '{
    "session": [
        "csrf-token=aaaa, id=aaaa",
        "csrf-token=yyyy, id=yyyy",
        "csrf-token=zzzz, id=zzzz"
    ]
}' -k

# GET RANDOM COOKIES SESSION
curl --location 'https://127.0.0.1:8787/admin/session/random' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' -k

# GET DOMAIN
curl --location 'https://127.0.0.1:8787/admin/domain' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' -k

# GET RANDOM DOMAIN
curl --location 'https://127.0.0.1:8787/admin/domain/random' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' -k

# SAVE DOMAIN
curl --location --request PUT 'https://127.0.0.1:8787/admin/domain' \
--header 'Authorization: Basic YWRtaW46dGVsbw==' \
--header 'Content-Type: application/json' \
--data '{
    "domain": [
        "subdomain001.gramica.online",
        "subdomain002.gramica.online",
        "subdomain003.gramica.online",
        "subdomain004.gramica.online",
        "subdomain005.gramica.online",
        "subdomain006.gramica.online"
    ]
}' -k
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
