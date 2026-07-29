# Engineering Specification

## Stack

-   React
-   Vite
-   TypeScript
-   Tailwind CSS
-   React Router
-   Vercel (Free)

## Constraints

-   Use Google Stitch React screens.
-   Never redesign the UI.
-   No backend.
-   No database.
-   No authentication.
-   No paid services.

## Data

Store demo data in:

``` text
/src/data
products.json
lists.json
shoppingMissions.json
buddies.json
messages.json
```

## Routes

``` text
/
/my-space
/list/:id
/chat/:id
/product/:id
```

Recommendations must come from Shopping Missions and exclude products
already in the active list.
