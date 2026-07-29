# Zepto — My Space & Buddies Prototype

High-fidelity PM case-study prototype for Zepto. Adds **My Space** and **Buddies** on top of Google Stitch UI screens — no redesign, local JSON only.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Deploy: Vercel (free tier)

## Quick start

```bash
npm install
npm run dev
```

Open the local URL (usually `http://localhost:5173`). The UI is mobile-first (phone viewport).

## Demo flows

1. **My Space → Breakfast → Recs → Product**  
   Home → My Space → Breakfast → Salted Butter (You May Also Need) → Product page

2. **Buddies → Arindam → Shared product → Product**  
   Buddies → Arindam → Korean Spicy Ramen card → Product page

3. **Shared List → Weekend Party → Recs → Product**  
   My Space → Shared Lists → Weekend Party → Ice / Soft Drinks / Paper Cups → Product page

Full path: Breakfast → Butter product → Buddies → Arindam → Korean Ramen product.

## Data

Demo data lives in `src/data/`:

- `products.json`
- `lists.json`
- `shoppingMissions.json`
- `buddies.json`
- `messages.json`

Recommendations come from shopping missions and never include products already on the active list.

## Deploy

```bash
npm run build
npx vercel
```

Or connect the repo to Vercel. `vercel.json` provides SPA routing fallback.
