# Paws API

A simple pets adoption API built with Cloudflare Workers + D1 (SQLite).

**Base URL:** `https://paws-api.jdog.dev`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/pets` | List all pets |
| GET | `/pets/:id` | Get a single pet |
| POST | `/pets` | Add a new pet |
| GET | `/requests` | List all adoption requests |
| POST | `/requests` | Create an adoption request (body: `name`, `petName` — pet must exist) |
| DELETE | `/requests/:id` | Remove an adoption request by id |
| GET | `/docs` | API documentation |

## Development

```bash
npm run dev       # local dev server
npm run deploy    # deploy to Cloudflare
```

### First-time DB setup

```bash
# Apply schema locally
npx wrangler d1 execute paws-db --local --file=src/schema.sql

# Apply schema to production
npx wrangler d1 execute paws-db --remote --file=src/schema.sql
```

The schema includes the `adoption_requests` table used by `GET/POST/DELETE` `/requests`. Re-run the commands above when that table is added or changed (existing `pets` data is preserved; `INSERT OR IGNORE` keeps seed rows).
