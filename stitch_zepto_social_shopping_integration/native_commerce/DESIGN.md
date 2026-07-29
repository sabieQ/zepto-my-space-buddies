---
name: Native Commerce
colors:
  surface: '#fff7fe'
  surface-dim: '#e0d7e0'
  surface-bright: '#fff7fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf1fa'
  surface-container: '#f4ebf4'
  surface-container-high: '#eee5ef'
  surface-container-highest: '#e8e0e9'
  on-surface: '#1e1a20'
  on-surface-variant: '#4b4450'
  inverse-surface: '#332f36'
  inverse-on-surface: '#f7eef7'
  outline: '#7d7482'
  outline-variant: '#cec3d2'
  surface-tint: '#7747a7'
  primary: '#1f003c'
  on-primary: '#ffffff'
  primary-container: '#3c006b'
  on-primary-container: '#aa78db'
  inverse-primary: '#ddb8ff'
  secondary: '#b90043'
  on-secondary: '#ffffff'
  secondary-container: '#e31657'
  on-secondary-container: '#fffbff'
  tertiary: '#220d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#401e00'
  on-tertiary-container: '#b88359'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb8ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#5e2e8d'
  secondary-fixed: '#ffd9dd'
  secondary-fixed-dim: '#ffb2bb'
  on-secondary-fixed: '#400012'
  on-secondary-fixed-variant: '#910033'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#f7ba8d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#663d1a'
  background: '#fff7fe'
  on-background: '#1e1a20'
  surface-variant: '#e8e0e9'
  zepto-purple-light: '#F3E8FF'
  success-green: '#259547'
  offer-green: '#00833E'
  neutral-gray-100: '#F2F4F7'
  neutral-gray-200: '#E4E7EC'
  surface-white: '#FFFFFF'
  text-primary: '#1D2939'
  text-secondary: '#667085'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  price-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '800'
    lineHeight: 20px
  price-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
  label-subtext:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-page: 1rem
  gutter-grid: 0.75rem
  stack-sm: 0.25rem
  stack-md: 0.5rem
  stack-lg: 1rem
  section-gap: 1.5rem
---

## Brand & Style

This design system is engineered to be a seamless extension of a high-growth quick-commerce platform. The brand personality is **Fast, Friendly, and Intuitive**, prioritizing utility and speed without sacrificing a premium, modern feel. 

The design style follows a **Corporate Modern** approach with **Soft Tactile** influences. It utilizes a product-first layout philosophy where high-quality photography is supported by a clean, systematic interface. The "Native to Zepto" philosophy dictates that new social and organizational features (My Space, Buddies) must feel like core utility updates rather than secondary experimental layers. 

Visual signals like vibrant primary accents, high-contrast action buttons, and rounded container logic are used to guide the user through a dense, information-rich environment.

## Colors

The color palette is anchored by a deep, authoritative purple used for branding and primary navigation elements. A high-energy "vibrant pink" is reserved for the most critical calls-to-action (CTAs) and primary buttons to drive conversion. 

Secondary signaling relies on a distinct "offer green" for price drops, savings, and discounts—a crucial component of the value-driven shopping experience. Backgrounds remain strictly neutral (White or Light Gray) to allow product imagery to stand out. Tonal variations of purple (light washes) are used to define feature-specific sections like "My Space" headers or "Special Offers."

## Typography

The system uses a dual-font strategy. **Plus Jakarta Sans** provides a friendly yet modern geometric look for headlines, titles, and price points, where personality and legibility are paramount. **Inter** is used for all body copy, product descriptions, and metadata to ensure maximum readability at small sizes on mobile devices.

Prices are treated as a specific typographic class with heavy weights to ensure they are the first thing a user sees on a product card. Savings and strike-through prices use a secondary, lower-contrast gray to maintain hierarchy.

## Layout & Spacing

The layout follows a **fluid grid** optimized for mobile-first consumption. A standard 16px (1rem) side margin is maintained across all screens. Elements are grouped using a "stack" logic: 4px for related text elements, 8px for internal component padding, and 16px for vertical separation between cards or sections.

Product grids typically display two items per row to maximize image size, while discovery sections ("You May Also Need") use a horizontal scrolling (carousel) pattern to preserve vertical screen real estate.

## Elevation & Depth

This design system uses **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. Depth is communicated through:
- **Surface Tiering:** Using light gray backgrounds (`#F2F4F7`) for the page and pure white (`#FFFFFF`) for cards to create a subtle lift.
- **Stroke-based Definition:** Cards and input fields use a subtle 1px border (`#E4E7EC`) to define boundaries without adding visual weight.
- **Active States:** Subtle, highly diffused shadows (4px blur, 5% opacity) may be applied to floating action buttons or active cart states to indicate interactivity.

## Shapes

The shape language is consistently **Rounded**. Standard components like product cards and buttons use a 0.5rem (8px) radius. Larger container elements and banners utilize a 1rem (16px) radius to create a soft, friendly container for groups of items. Interaction elements like "Add" buttons or tags often utilize fully rounded (pill-shaped) ends to differentiate them from structural containers.

## Components

### Buttons
- **Primary:** Full-width pink (#FF3269) with white text for main actions (e.g., "Add Address").
- **Secondary/Add:** White background with a purple border and a "+" icon, or a small pill-shaped button for product cards.
- **Ghost:** Purple text with no background for "See all" or "Edit" actions.

### Cards
- **Product Card:** White background, 8px corner radius, 1px light gray border. Contains image at top, followed by price, title, weight, and a floating or bottom-aligned "Add" button.
- **Feature Card:** Used in "My Space." Larger icons, bold titles, and a chevron to indicate navigation.

### Input & Search
- **Search Bar:** Large 12px rounded container, light gray background, left-aligned magnifying glass icon, and "placeholder" text in text-secondary color.

### Navigation
- **Bottom Nav:** 5-item fixed bar with white background. Active state uses the primary purple for the icon and label. Icons are simple line-art style.

### Lists & Chat
- **Buddy Chat:** Bubbles follow the standard 8px-12px roundedness. Shared product cards within the chat are simplified versions of the standard product card, focused on the image and "Add to Cart" action.