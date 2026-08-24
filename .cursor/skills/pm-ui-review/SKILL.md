---
name: pm-ui-review
description: >-
  Product-manager review of UI before calling a frontend task done. Catches
  missing actions, default MUI look, sparse settings lists, hover-only
  controls, lost object states, and button placement. Use after any Studio,
  widget, page, modal, form, theme, members, invite, or layout change, and
  whenever Ankur asks to ship, restyle, match Linear, or add a feature.
---

# PM UI review

Walk the change as a product manager, not an engineer. Do this before you say done.

## Hard stop

Do not ship a screen if a user can create or submit something and then cannot find or edit it.

Do not ship a people/list/settings screen that looks like a leftover form on a blank page. Dress it like Linear. Brand it like Sling.

**Gold standard:** Settings → Members (`modules/settingsModule/SettingsDetail/Members/index.js`). Ankur signed this off. Next settings pages (Keys, Company, Theme, any new list) must match that page: Linear structure, Sling orange/cream/Open Sans, 14px body, 16px names, 14px buttons, primary action on the right, cream fields, invite/create in a modal when adding people.

## Checklist

Run every item against the changed screens and any screen that shares that state.

- **Find it.** Every status you can put an object in has a visible list or filter (draft, in review, published). Do not hide the only inbox behind an admin-only nav item.
- **Edit it.** Critical actions (edit, save, submit, publish, invite, remove) are always visible. Never hover-only.
- **Place it.** Primary actions sit on the right. Status text can sit on the left.
- **Dress it.** Lists match Linear’s layout, not Linear’s type. Search on the left, primary button on the right, column headers, avatars, status/role pills, a count bar (`Active 12`). Invite/create opens a modal. Do not dump email + role fields on the page. Keep Sling orange `#ff9800`, cream, Open Sans, and Sling sizes: body 14px, names 16px, buttons 14px. Never Linear purple. Never Linear 12px. Settings forms use a two-column field grid that fills the page. Do not leave a 560px left column with Save stranded on empty white. Do not add decorative infographics.
- **Brand it.** No default MUI chrome. Cream fields, orange focus, no floating-label-in-outline look unless the rest of the page already does. Selected chips use color only — no X unless the chip is removable.
- **Load it.** One loader. Paginate heavy lists. Do not stack infinite live previews.
- **Say it.** Empty and error copy tell the user where the thing went or what to do next. No raw "Internal Server Error" as the only clue if you can map it.
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
