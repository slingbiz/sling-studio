---
name: pm-ui-review
description: >-
  Product-manager review of UI before calling a frontend task done. Catches
  missing actions, default MUI look, hover-only controls, lost object states,
  and button placement. Use after any Studio, widget, page, modal, form,
  theme, or layout change, and whenever Ankur asks to ship, restyle, or
  add a feature.
---

# PM UI review

Walk the change as a product manager, not an engineer. Do this before you say done.

## Hard stop

Do not ship a screen if a user can create or submit something and then cannot find or edit it.

## Checklist

Run every item against the changed screens and any screen that shares that state.

- **Find it.** Every status you can put an object in has a visible list or filter (draft, in review, published). Do not hide the only inbox behind an admin-only nav item.
- **Edit it.** Critical actions (edit, save, submit, publish) are always visible. Never hover-only.
- **Place it.** Primary actions sit on the right. Status text can sit on the left.
- **Brand it.** No default MUI chrome. Use Sling orange `#ff9800`, cream backgrounds, no floating-label-in-outline look unless the rest of the page already does. Selected chips use color only — no X unless the chip is removable.
- **Load it.** One loader. Paginate heavy lists. Do not stack infinite live previews.
- **Say it.** Empty and error copy tell the user where the thing went or what to do next. No raw "Internal Server Error" as the only clue if you can map it.
- **Don't fake it.** No decorative controls (Remember Me, type dropdowns, review links) that do nothing or hide the real path.

## How to review

1. List the user jobs on the screen (create, save, submit, find, edit).
2. Click each job in your head. Name the next screen. If you cannot, fix it.
3. Check sibling routes that read the same records.
4. Only then run tests and ship.

## Sling examples that already bit us

- Submit for Review with no In review filter and Review Queue hidden from the author.
- Edit only on hover, so Draft cards looked locked.
- Save / Submit left-aligned under default MUI fields.
- Infinite scroll of iframe previews that felt like a hang.
- Remember Me checkbox that stored nothing.
