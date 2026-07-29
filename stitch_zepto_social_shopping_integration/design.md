# Zepto Product Challenge
# Design Specification for Google Stitch
## Project Overview
This project introduces **two new core features** to the existing Zepto mobile application:
1. **My Space** – A personalized shopping hub that helps users organize shopping lists and discover relevant products using AI.
2. **Buddies** – A social shopping experience where users can collaborate with friends and family through shared lists and shopping conversations.
These features should be designed as **native additions to the current Zepto application**, preserving Zepto's existing visual identity, interaction patterns and navigation.
The objective is **not to redesign Zepto**, but to extend it with two new experiences that feel like official product updates.
---
# Product Goal
Increase the percentage of Monthly Active Users who purchase products from at least one new category every month.
The experience should encourage category discovery through:
- Personalized AI recommendations
- Shared shopping experiences
- Collaborative grocery planning
- Contextual product suggestions
- Trusted recommendations from friends and family
Discovery should happen naturally during the shopping journey rather than through traditional browsing.
---
# Design Principles
The entire experience should feel:
- Native to Zepto
- Clean
- Minimal
- Fast
- Friendly
- Premium
- Personal
Avoid making the experience look like an "AI application."
AI should remain invisible and simply make shopping feel smarter.
---
# Visual Language
Follow Zepto's current design system.
Maintain:
- Existing purple branding
- White backgrounds
- Rounded cards
- Product-first layouts
- Existing typography hierarchy
- Existing bottom navigation style
- Existing product cards wherever possible
- Existing spacing and iconography
The new features should feel like they already belong inside Zepto.
---
# Updated Bottom Navigation
Keep the current Zepto navigation style and add the new feature.
```
🏠 Home
📂 Categories
✨ My Space
🥬 Fresh
👥 Buddies
```
---
# New Feature 1 — My Space
## Purpose
My Space is a personal shopping companion.
It combines shopping lists with AI-powered recommendations to help users naturally discover products beyond their usual purchases.
This section is designed around **organization and personalized discovery**.
---
# My Space Dashboard
Page Title
**My Space**
Subtitle
> Your personal shopping companion
Display five primary cards.
---
## 1. My Personal Lists
Description
Create and manage your personal shopping lists.
Examples
- Weekly Grocery
- Breakfast
- Gym Diet
- Office Snacks
- Movie Night
Card Style
Large rounded card
Checklist icon
Chevron
---
## 2. Shared Lists
Description
Shopping lists shared with Buddies.
Examples
- Family Grocery
- Weekend Party
- Goa Trip
Card Style
People icon
Rounded card
Chevron
---
## 3. Trending For Me
Description
Products and categories selected based on shopping history and preferences.
Card Style
Trending icon
Rounded card
Chevron
---
## 4. Surprise Me
Description
Unexpected products, offers and bundles selected personally for the user.
Card Style
Gift icon
Rounded card
Chevron
---
## 5. Settings
Description
Manage shopping preferences and recommendation settings.
Card Style
Settings icon
Rounded card
Chevron
---
# Screen — My Personal Lists
Purpose
Display all personal shopping lists.
Top App Bar
My Personal Lists
Floating Action Button
+ Create List
Each List Card should display
- List Name
- Number of Items
- Last Updated
- Share Button
Examples
- Breakfast
- Weekly Grocery
- Gym Diet
- Office Snacks
---
# Screen — Open Personal List
Example
Breakfast
Top Bar
Back
List Name
Share Button
Edit Button
Shopping items displayed using existing Zepto product cards.
Example
- Eggs
- Bread
- Coffee
- Milk
Below the list display three AI sections.
---
## You May Also Need
Recommend complementary products related to the shopping list.
Example
Butter
Jam
French Press
Each recommendation should include
- Product Image
- Price
- Add Button
- Small explanation
Example
> Pairs well with your breakfast items.
---
## Best Combo
Display
- Bundle Name
- Included Products
- Estimated Savings
Primary CTA
Add Bundle
---
## Surprise For You
Display
One exclusive recommendation.
Include
- Large Product Card
- Offer Badge
- Short explanation
Example
> Based on your shopping habits.
Primary CTA
Try Now
---
# Screen — Shared Lists
Purpose
Collaborative shopping with Buddies.
Display shared shopping lists.
Examples
- Family Grocery
- Weekend Party
- Goa Trip
Each card displays
- List Name
- Member Avatars
- Number of Items
- Last Activity
---
# Screen — Open Shared List
Top
List Name
Member Avatars
Invite Buddy Button
Shopping items
Each item displays
- Product
- Added By
- Status
Below the shopping list
Display AI Suggestions
Example
- Paper Cups
- Ice
- Cold Drinks
- Napkins
Short explanation
> Recommended based on products already in this shared list.
Primary CTA
Add All
---
# Screen — Trending For Me
Purpose
Personalized discovery.
Show vertically scrolling product recommendations.
Possible sections
Based on your shopping
Popular among your Buddies
Seasonal Picks
New Categories You May Like
Each recommendation card includes
- Product Image
- Price
- Add Button
- One-line reason
---
# Screen — Surprise Me
Purpose
Fun product discovery.
Hero Recommendation
Large Product Card
Offer Badge
Reason
CTA
Add to Cart
Below
Two or three smaller recommendation cards.
This page should feel playful without becoming overwhelming.
---
# New Feature 2 — Buddies
## Purpose
Buddies introduces collaborative shopping into Zepto.
Users can connect with family and friends, share products, create shared shopping lists and discover products through trusted people instead of only AI.
This feature should feel like a lightweight shopping messenger.
---
# Buddies Home
Page Title
Buddies
Top Actions
Search
Add Buddy
Display conversation list.
Each conversation displays
- Avatar
- Name
- Last Shared Product or Message
- Time
- Unread Badge
Example
Rahul
Shared Korean Ramen
10 mins ago
---
# Buddy Chat
Layout similar to a familiar messaging interface.
Support
- Text Messages
- Shared Products
- Shared Lists
- Offers
- Bundle Cards
---
## Shared Product Card
Display
- Product Image
- Product Name
- Price
Actions
- Add to Cart
- Save to My Personal List
- Share Again
---
## Shared List Card
Display
Weekend Party
12 Items
Members
Primary CTA
Open List
---
## Chat Actions
Users can
- Share Products
- Share Lists
- Create Shared List
- Invite Buddies
- React to Products
Keep interactions lightweight and shopping-focused.
---
# Product Cards
Reuse existing Zepto product cards wherever possible.
Each card includes
- Product Image
- Product Name
- Weight
- Price
- Offer Badge
- Add Button
No redesign required.
---
# Recommendation Cards
Recommendation cards should be visually distinct but subtle.
Each recommendation includes
- Product
- Short reason
- Add Button
Examples
- Pairs well with your list
- Popular among your Buddies
- Great value bundle
- Based on your shopping habits
Avoid making recommendations look like advertisements.
---
# Animations
Use subtle micro interactions.
Examples
- Fade In
- Slide Up
- Card Expansion
- Smooth Screen Transitions
Avoid flashy animations.
---
# Typography
Use typography consistent with the existing Zepto application.
Hierarchy
- Large Page Titles
- Medium Section Titles
- Small Helper Text
Maintain generous spacing.
---
# Overall Experience
The experience should communicate:
- Personal
- Helpful
- Organized
- Intelligent
- Collaborative
- Familiar
Users should feel that Zepto has become smarter without changing how they already shop.
The final UI should look like an official Zepto feature release rather than a concept app.