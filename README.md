# Ghost Creators Software Group

Premium Next.js App Router platform for music publishing, distribution, rights management, and client intake under the Ghost Creators Software Group brand.

## What's Included

- Premium dark landing page at `/`
- Guided client intake flow at `/intake`
- Notion-backed intake endpoint at `/api/intake`
- AI-assisted intake validator at `/api/validate-intake`
- Internal metrics dashboard at `/dashboard`
- Client-facing portal shell at `/portal`
- Local mock data fallback for dashboard and portal when live integrations are not configured

## Tech Stack

- Next.js App Router
- TypeScript
- Route Handlers
- Zod validation
- OpenAI Responses API
- Notion server-side integration

## Routes

- `/`
- `/intake`
- `/dashboard`
- `/portal`
- `POST /api/intake`
- `POST /api/validate-intake`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Duplicate `.env.example` as `.env.local`.

3. Add the required variables:

```env
NOTION_API_KEY=your_notion_secret
NOTION_DATABASE_ID=your_notion_data_source_id
OPENAI_API_KEY=your_openai_api_key
```

4. Start the app:

```bash
npm run dev
```

5. Production verification:

```bash
npm run typecheck
npm run build
```

## Notion Setup

The intake route is implemented server-side and expects a shared Notion data source. The environment variable remains `NOTION_DATABASE_ID`, but the app uses the current Notion data source API.

### Required Steps

1. Create a Notion integration and copy the internal integration token into `NOTION_API_KEY`.
2. Share your target CRM table or data source with that integration.
3. Copy the target data source ID into `NOTION_DATABASE_ID`.

### Recommended Notion Properties

The route maps any matching properties it finds and still stores the full submission as page content blocks. For the best CRM-style row setup, add these properties to the target Notion data source:

- `Name` or any title property
- `Artist Name`
- `Email`
- `Phone`
- `PRO Affiliation`
- `PRO IPI Number`
- `Song Title`
- `Primary Artist`
- `Featured Artists`
- `Producers`
- `Genre`
- `Explicit or Clean`
- `Total Writers`
- `Artist Split %`
- `Producer Split %`
- `Other Writers %`
- `WAV File URL`
- `Cover Art URL`
- `Lyrics`
- `Distributor`
- `Requested Release Date`
- `Services Needed`
- `Rights Confirmed`
- `Status`

### Submission Behavior

- Valid intake submissions are parsed with Zod.
- On success, the server creates a new Notion page in the configured data source.
- Secrets never reach the client.
- If Notion is not configured, the form returns a clear setup error instead of silently failing.

## OpenAI Validator Setup

The validator endpoint uses `OPENAI_API_KEY` server-side only.

### Response Shape

The AI validator returns structured JSON with:

- `readiness_score`
- `errors[]`
- `warnings[]`
- `recommendations[]`

### Behavior

- Rules-based validation always runs first.
- If OpenAI is configured, the AI review augments the deterministic checks.
- If OpenAI is not configured, the endpoint still returns a useful rules-only result.

## Dashboard Data

- `/dashboard` prefers live Notion data when the integration is configured.
- If Notion is unavailable, it falls back to local mock data so the UI still renders cleanly in local development.

## Client Portal

The portal uses a lightweight placeholder access gate for now and is structured to be replaced later with a real auth provider such as Clerk, NextAuth, or Supabase Auth.

Demo portal email:

```text
jordan@ghostclients.com
```

## Deploying To Vercel

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add the same environment variables in the Vercel project settings:

- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`
- `OPENAI_API_KEY`

4. Deploy.

## Current Verification

The current codebase passes:

```bash
npm run typecheck
npm run build
```
