# PetalFlow — Flower Delivery 1:1 Interactive Demo Design Spec

## Goal
Build an interactive 1:1 Next.js mobile prototype matching the reference Flower Delivery UI showcase so it can be presented live to a flower shop owner.

## Architecture & Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (`globals.css` theme tokens centered on `#6F1AB6`)
- **Icons:** `lucide-react`
- **State:** Client-side `AppContext` linking cart, wishlist, filters, location, active screen history, and live chat messages.
- **Desktop Presentation:** Centered iPhone 15 Pro frame (`390px` viewport width) with Dynamic Island, adaptive `9:41` status bar, home indicator, and a collapsible right-hand Demo Screen Navigator for instant jumping between all 13 screens.
- **Mobile Presentation:** Full-bleed `100dvh` native mobile layout (`< 640px`).

## Screens Covered
1. `onboarding-1` — Welcome screen with `#Flowers` pill, hero portrait, "Your Premier Choice for Effortless Flower Delivery", "Let's Get Started", and "Sign In" link.
2. `onboarding-2` — "Seamless Flower Shopping Experience" with carousel pagination dots and purple arrow CTA.
3. `sign-in` — Email (`user@example.com` placeholder), password with show/hide toggle, Forgot Password native `<dialog>`, social login buttons.
4. `create-account` — Full registration form with terms toggle and social registration.
5. `home` — Purple header (`New York, USA`, cart badge, notifications), search bar with QR/filter, Special Offers horizontal scroll-snap carousel (`Up to 20%`), Recommended For You (`All`, `Bouquets`, `Flower`, `Indoor`) 2-column grid, 5-tab bottom navigation.
6. `product-detail` — `Blue White Bouquets` (4.9★), interactive 360° drag rotation & thumbnail switcher, seller `Jacob Doe` (chat + call shortcuts), expandable description, size selector (`S`/`M`/`L`/`XL`), dynamic Total Price, Add to Cart.
7. `explore` — Vector Manhattan street map (`Worth St`, `Reade St`, `Chambers St`, `Warren St`, `Park Pl`, `Broadway`, `Church St`) with clickable florist pins (`7.5 Km`, `8.8 Km`, `9.8 Km`, `6.8 Km`) and bottom florist cards (`The Blooming Haven`, `Serena Bouquets`).
8. `florist-store` — Store product catalog (`Blue Vase`, `Pink Flowers`, `Rose Boutique`, `Rainbow Bouquet`, etc.).
9. `cart` — Native CSS scroll-snap swipe-to-reveal delete action + accessible trash button, `- 1 +` steppers, promo code (`SAVE13`, `FLOWER10`), exact cost breakdown (`Sub-Total`, `Delivery Charge`, `Tax`, `Discount`, `Total Cost`), native `<dialog>` checkout confirmation.
10. `chat` — `Sheila Lemke (Online)` conversation with `TODAY` divider, incoming/outgoing bubbles, `08:04 pm`, live message sending, and Call shortcut.
11. `call` — Full-screen blurred portrait call view (`Sheila Lemke`, ticking timer starting at `12:08`), purple floating call bar with Mute/Speaker/Video/Hangup.
12. `wishlist` & `profile` — Complete bottom-nav tabs matching the design system.
