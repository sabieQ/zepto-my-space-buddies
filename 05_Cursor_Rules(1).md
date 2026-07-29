# Cursor Rules

Use the existing Google Stitch-generated React screens as the UI
foundation.

Do NOT recreate or redesign the UI.

## Primary Objective

Your responsibility is to wire the existing screens together and make
them functional while preserving the original design.

## Technical Rules

-   Use React + TypeScript.
-   Use Tailwind CSS.
-   Use React Router.
-   Keep all demo data inside local JSON files.
-   No backend.
-   No database.
-   No authentication.
-   No external APIs.
-   No paid libraries.
-   Write clean, modular and reusable code.
-   Preserve existing components whenever possible.

## UI Rules

-   Never redesign Zepto.
-   Never generate replacement screens.
-   Keep layouts, spacing, colors and components from Google Stitch.
-   Only add interactions and navigation.

## Prototype Flows

### Flow 1

My Space → Breakfast List → Recommendations → Product Page

### Flow 2

Buddies → Rahul Chat → Shared Product → Product Page

### Flow 3

Shared List → Weekend Party → Recommendations → Product Page

## Recommendation Rules

-   Recommendations come from shoppingMissions.json.
-   Never generate random recommendations.
-   Do not recommend products already present in the active shopping
    list.

## Deployment

The application must deploy successfully on the free tier of Vercel with
no backend services.
