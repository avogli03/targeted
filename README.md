# Targeted Project

Magazine-style publishing project built with Next.js and Strapi.

## Apps

- `frontend`: Next.js site with English and Albanian language switching.
- `backend`: Strapi CMS scaffold with localized Article and Category content types.

## Run

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev:frontend
```

Start Strapi:

```bash
npm run dev:backend
```

The frontend works with local demo content by default. Set `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` when you are ready to connect it to Strapi.
