---
name: pm-ui-review
description: >-
  Product-manager review of UI before calling a frontend task done. Catches
  missing actions, default MUI look, sparse settings lists, hover-only
  controls, lost object states, and button placement. Decides what to do next
  from locked Sling product decisions and Pages screenshots. Use after any
  Studio, widget, page, modal, form, theme, members, invite, or layout change,
  and whenever Ankur asks to ship, restyle, match Linear, or add a feature.
---

# PM UI review

Walk the change as a product manager, not an engineer. Do this before you say done.

Decide what to do next from locked Sling decisions and Pages work. Do not reopen closed calls.

## Hard stop

Do not ship a screen if a user can create or submit something and then cannot find or edit it.

Do not ship a people/list/settings screen that looks like a leftover form on a blank page. Dress it like Linear. Brand it like Sling.

**Gold standard:** Settings → Members (`modules/settingsModule/SettingsDetail/Members/index.js`). Ankur signed this off. Next settings pages (Keys, Company, Theme, any new list) must match that page: Linear structure, Sling orange/cream/Open Sans, 14px body, 16px names, 14px buttons, primary action on the right, cream fields, invite/create in a modal when adding people.

## Product decisions already locked (do not reopen)

- Keep widget props (slots editors fill). AI writes JSX; it does not replace props.
- Gallery is the asset library. Hide Media Constants (dead, save was fake).
- Image props: Gallery picker writes the URL. No Constants.
- Restore widget version = new draft; live site unchanged until publish.
- Invite existing Sling emails (they leave the old workspace). Last owner cannot move.
- Hide dead Studio rail (AI Builder, Sitemap, Amp, Emailers, Analytics, Build & Deploy, Headless APIs) and Market Place.
- Identity: Ankur Pata / ankur@sling.biz / slingbiz. Never ankurtd for Sling git/gh.
- Gold standard remains Members. Orange `#ff9800`, cream `#fff8f0`, Open Sans, 14px/16px/14px. Never Linear purple. Never Linear 12px.
- Button chrome is Edit Layout / Pages list. Ankur signed this off.
- Pages Data tab is gone. Old `/pages/{id}/data` URLs land on Layout. Do not bring back Coming Soon.
- Headless APIs rail is gone. Old `/headless-apis` URLs land on Widgets. Bring back only as a real rebuild (persist tenant APIs + bind response-derived). Do not polish this screen.
- Widget Props inspector: labeled Source + Value; Add prop writes schema + this instance, not a fake button.
- Theme is a main rail item at `/theme`, not a Settings subpage. Settings keeps Company, Keys, Members, Audit. Old `/settings/theme` redirects. Storefront widgets must read MUI `theme.palette`, not hardcoded brand hex.
- Audit is a log, not an inbox. Names not “Someone”. Action is a label not a CTA.
- Routes is a Members-style list: search left, Add route right, template picker in the add/edit modal, Preview/Layout/Edit/Delete always visible. No Guide. Old `/routes/guide` and `/routes/routes-list` land on `/routes`.
- Page templates landing (`/pages`) is tiles of the real storefront (capped live iframes), not a table of fake thumbs. Three tiles across on large screens. Default `pagelayout_default` image until the live preview actually paints (ignore about:blank). While that wait is on, three orange dots in the bottom-right of the pane — not a center spinner. Heading + one line live on AppsContainer (a template is the layout, routes pick which one a URL uses) — do not repeat that title inside the card. No grey “Templates N” strip — count sits next to search. Route path is a small (13px) cream code chip. Edit, Configure, and Delete on tiles show on hover (and keyboard focus), not always. Configure (orange, right) opens Edit Layout (`/pages/{id}/layout`). Edit opens the name modal. Tile click still opens layout. No route = assign one. Do not iframe every template at once.
- Every AppsContainer screen has a 20px ink h1 and a 14px muted one-line description so people know what the page is. Copy lives on AppsContainer. Do not put a second title in the card. Keep inner bars that hold actions (Theme Save, Widgets filters, Layout Edit).
- One loader per screen. InfoView is toasts only — do not overlay a second spinner on FETCH_START. Shared Loader is Sling orange, never MUI blue. Hydrating company info must not flash a page loader.

## Buttons (signed off)

Copy Edit Layout + Pages list. Do not invent a third look.

**Primary** (Apply Changes, Save, Add template, Invite, Upload): fill `#ff9800`, text white, 14px, fontWeight 600, Open Sans, `textTransform: none` (never ALL CAPS), `borderRadius: 8`, padding ~`8px 18px`, `boxShadow: none`, hover `#f57c00`. Sits on the **right**.

**Secondary / Cancel** on white or cream: orange text + 1px `#ff9800` border, white fill, 14px weight 500, radius 8, hover background `#fff8f0`.

**Cancel** on ink header (`#163a5f` Edit Layout bar): white ghost, 1px `rgba(255,255,255,0.55)` border, 14px, hover `rgba(255,255,255,0.08)`.

**Text actions** (Delete, Gallery): 14px `#ff9800`, no caps, always visible on **lists** (Members, Routes). Template **tiles** are the exception: Edit, Configure, and Delete show on hover / focus-within so the preview stays clean. Configure is the filled orange action and opens Edit Layout. Do not make Members hover-only.

Never: `theme.palette.primary.main` / MUI blue contained, Linear purple, 12px, default MUI uppercase, drop-shadow on buttons, primary on the left.

## What to do next: Pages

Pages (`/pages`) is the next surface to match the product.

- Add Template modal: leftover MUI “Add Template Id”. Make it a Members-style modal (cream fields, orange Save on the right, 14px). Copy can stay human: unique id used by routes.
- Configure layout (`/pages/{id}/layout`): structure is good. Do not flatten it. Recolor widget blocks from default MUI/#0081CB blue to a 2026 ink blue (suggested `#163a5f` blocks, `#e8eef4` nests). Keep orange for Apply/primary. Not Linear purple. Not Material Blue 500.
- Edit layout left library: show widget **previews**, not generic icons. Do not stack infinite live iframes (that already felt like a hang). Lazy/static thumbnails or capped previews.
- Page templates list is tiles with live storefront previews (search left, Add template right, one loader, 3-up on lg, default image while preview loads). Do not go back to the fake-thumb table.
- Edit Layout General Settings: white card on cream, ink 14px, human breakpoint labels (Mobile (sm)). Not cream-on-cream sm/md/lg.
- Data tab is gone, not later. Do not ship a Coming Soon Data page.
- Widget Props inspector: labeled Source + Value cards; Add prop writes the widget schema and this placement. Gallery still picks image URLs. Do not ship a fake Add.

## Checklist

Run every item against the changed screens and any screen that shares that state.

- **Find it.** Every status you can put an object in has a visible list or filter (draft, in review, published). Do not hide the only inbox behind an admin-only nav item.
- **Edit it.** Critical actions (edit, save, submit, publish, invite, remove) are always visible on lists. Never hover-only on Members or Routes. Template tiles are different: Edit, Configure, and Delete on hover so the shop preview is the product. Configure opens Edit Layout.
- **Place it.** Primary actions sit on the right. Status text can sit on the left.
- **Dress it.** Lists match Linear’s layout, not Linear’s type. Search on the left, primary button on the right, column headers, avatars, status/role pills, a count bar (`Active 12`). Invite/create opens a modal. Do not dump email + role fields on the page. Keep Sling orange `#ff9800`, cream, Open Sans, and Sling sizes: body 14px, names 16px, buttons 14px. Never Linear purple. Never Linear 12px. Settings forms use a two-column field grid that fills the page. Do not leave a 560px left column with Save stranded on empty white. Do not add decorative infographics.
- **Brand it.** No default MUI chrome. Cream fields, orange focus, no floating-label-in-outline look unless the rest of the page already does. Selected chips use color only — no X unless the chip is removable.
- **Load it.** One loader. Paginate heavy lists. Do not stack infinite live previews.
- **Say it.** Empty and error copy tell the user where the thing went or what to do next. No raw "Internal Server Error" as the only clue if you can map it. Every main screen has a heading plus one line of what it is.
- **Don't fake it.** No decorative controls (Remember Me, Export CSV, Teams, Last seen) that we cannot back. No type dropdowns or review links that do nothing or hide the real path.

## How to review

1. List the user jobs on the screen (create, save, submit, find, edit, invite).
2. Click each job in your head. Name the next screen. If you cannot, fix it.
3. Hold it next to Linear for lists, members, and invites. If Linear would use a table + modal and we used a sparse form, rewrite it.
4. Check sibling routes that read the same records.
5. Only then run tests and ship.

## Sling examples that already bit us

- Submit for Review with no In review filter and Review Queue hidden from the author.
- Edit only on hover, so Draft cards looked locked.
- Save / Submit left-aligned under default MUI fields.
- Infinite scroll of iframe previews that felt like a hang.
- Review Queue tabs: page overlay spinner plus a second spinner in the list. One loader only.
- Remember Me checkbox that stored nothing.
- Members: email/role/Invite dumped on a white page. Linear uses search, Invite on the right, avatars, role pills, and an invite modal.
- Members after Linear restyle: 12–13px type. Sling body is 14px, names 16px, buttons 14px. Layout like Linear, type like Sling.
- Members first load: "Loading members…" plus Active 0. Show one orange spinner. Do not render the empty table until data is back.
- Review Queue still used MUI blue tabs and Approve. Match Members: Sling orange, 14px actions.
- Company Details: narrow left fields with Save across a white desert. Two-column grid. No fake infographic.
- Inner sidebars (Widgets/Settings) selected state must be Sling orange + cream, not MUI blue / primary.main.
- Inner + mini nav type is 16px / icons ~24px, not 12–14 leftover.
- Meta & Props looked like leftover MUI: cramped outlined inputs in a skinny left column. Match Company Details — two-column cream fields, orange focus, Required Props as a table with Add on the right and delete always visible.
- Code tab (Edit Widget and AI Generate) was a basic box. Use the existing Monaco editor with cream chrome, 14px, line numbers — not a plain textarea.
- Media Constants save was a mock. Gallery is the library; hide Constants.
- Gallery search icon did nothing. Search must actually filter.
- Layout widget library was icons, not previews. Show widget thumbnails, not generic icons — and do not stack infinite live iframes.
- Add Template was default MUI. Members-style modal: cream fields, orange Save on the right, 14px.
- Edit Layout General Settings was cream-on-cream with sm/md/lg. White card, ink 14px, human breakpoint labels (Mobile (sm)).
- Default MUI contained primary (blue, ALL CAPS).
- Data tab Coming Soon with a fake Save. The tab is gone; `/pages/{id}/data` opens Layout.
- Widget Props inspector was unlabeled accordion fields with a disabled “+ Add New Prop?” that did nothing. Labeled Source + Value; Add prop writes the widget definition and this cell.
- Page templates list used the same generic png for every row. Tiles must iframe a real storefront route, capped like the widget library. Show the default png until the live page paints, not a white about:blank flash. Empty copy if there is no route. Three tiles across on large screens. Route path is a 13px cream code chip. No grey Templates-count bar. Edit, Configure, and Delete on tiles are hover-only. Configure opens Edit Layout. Lists stay always-visible.
- Two loaders on most Studio pages: a leftover blue overlay on every fetch plus the page’s own orange spinner. InfoView is toasts only. Shared Loader is orange. Company info hydrate is silent.
