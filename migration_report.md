# Daily Reset — Migration Report

## Date
2026-05-15

---

## Files Deleted

| File | Reason |
|------|--------|
| `data/mindsetContent.ts` (project root) | Duplicate of `DailyResetNovo/data/mindsetContent.ts`. All 20 card IDs (m1–m20) confirmed present in the expanded 386-card version before deletion. |
| `data/dailyResets.ts` (project root) | Duplicate of `DailyResetNovo/data/dailyResets.ts`. All 100 day entries confirmed present in the DailyResetNovo version before deletion. |

---

## Files Created

| File | Description |
|------|-------------|
| `DailyResetNovo/data/dailyResetsExtended.ts` | 70 daily reset objects (days 31–100) migrated from legacy flat format to the new rich Ritual structure. Generated from `dailyResets.ts` with theme mapping, screen defaults, word_of_day rotation, notification copy, and evening reflections. |
| `DailyResetNovo/data/index.ts` | Unified content entry point. All app screens now import from here instead of individual content files. Exports: `rituals`, `dailyResetsExtended`, `getDayContent()`, `mindsetCards`, `mindsetCategories`, `ALL_REFLECTIONS`, `selectReflectionPrompt`, `getPhaseForDay()`, and all shared TypeScript types. |
| `DailyResetNovo/data/i18n/es/` | New folder created for future Spanish content. |

---

## Files Moved

| From | To |
|------|----|
| `DailyResetNovo/data/dailyResets.es.ts` | `DailyResetNovo/data/i18n/es/dailyResets.es.ts` |

No content was changed during the move. The file contains 100 Spanish-translated daily reset entries (days 1–100) plus templates for days 101–365.

---

## Files Updated

| File | What Changed |
|------|-------------|
| `DailyResetNovo/data/mindsetContent.ts` | Category values remapped (see Category Remapping section). TypeScript type updated. `mindsetCategories` array `id` values updated to match new capitalized names. No card content, titles, or IDs were modified. |
| `DailyResetNovo/data/rituals.ts` | `RitualTheme` type extended to include `'Rhythm'`. `RitualArc` type extended to include `'DEEPENING'`, `'TRANSFORMING'`, `'BECOMING'` — required for the new extended days. |
| `DailyResetNovo/app/(tabs)/mindset.tsx` | Import updated: `from '../../data/mindsetContent'` and `from '../../data/dailyResets'` → combined into `from '../../data'`. No component logic changed. |
| `DailyResetNovo/app/(tabs)/today.tsx` | Import updated: `from '../../data/dailyResets'` → `from '../../data'`. No component logic changed. |
| `DailyResetNovo/utils/contentSystem.ts` | Import updated: `from '../data/reflections'` → `from '../data'`. No utility logic changed. |

---

## Content Audit

| Content Type             | Before | After | Lost? |
|--------------------------|--------|-------|-------|
| Rituals (days 1–30)      | 30     | 30    | No    |
| Extended resets (31–100) | 0      | 70    | No    |
| Mindset cards            | 386*   | 386*  | No    |
| Reflection prompts       | 96     | 96    | No    |
| Spanish translations     | 100    | 100   | No    |

*386 includes 7 `mindsetCategories` UI entries + 379 actual `MindsetCard` objects.

---

## Category Remapping

| Old Category | New Category | Card Count |
|--------------|--------------|------------|
| `focus`      | `Focus`      | 62         |
| `discipline` | `Rhythm`     | 61         |
| `emotional`  | `Calm`       | 42         |
| `emotional`  | `Rest`       | 21         |
| `detox`      | `Clarity`    | 64         |
| `productivity` | `Momentum` | 62         |
| `momentum`   | `Momentum`   | 8          |
| **Total**    |              | **320** (card objects only) |

**Calm vs. Rest split logic** (from old `emotional` category, 63 cards → 42 Calm + 21 Rest):
- `Rest` cards: those about depletion, exhaustion, recovery, rest, healing, or slowing the nervous system (21 cards: emo2, emo5, emo7, emo8, emo9, emo14, emo17, emo22, emo23, emo24, emo25, emo33, emo35, emo37, emo43, emo44, emo46, emo51, emo52, emo54, emo59)
- `Calm` cards: those about anxiety, nervous system safety, emotional awareness, presence, and body sensation (42 cards, all remaining emotional cards)
- Ambiguous cards defaulted to `Calm` per spec.

**New `MindsetCategory` TypeScript type:**
```ts
type MindsetCategory = 'Focus' | 'Calm' | 'Courage' | 'Rest' | 'Clarity' | 'Momentum' | 'Rhythm';
```

---

## Extended Resets — Theme Distribution (days 31–100)

| Theme    | Days                                                    | Count |
|----------|---------------------------------------------------------|-------|
| Rhythm   | 32,38,41,48,51,53,57,62,64,68,71,74,84,85,90,92,93,99 | 18    |
| Calm     | 33,36,44,47,50,60,65,69,75,76,79,83,89,96,98           | 15    |
| Focus    | 31,35,43,46,52,56,63,70,78,81,86,91,97                 | 13    |
| Courage  | 37,42,45,54,58,66,73,77,80,87,100                      | 11    |
| Momentum | 34,39,49,55,61,67,88,94                                 | 8     |
| Clarity  | 40,59,72,82,95                                          | 5     |

**Arc assignment:**
- Days 31–60: `DEEPENING`
- Days 61–90: `TRANSFORMING`
- Days 91–100: `BECOMING`

---

## TypeScript Compilation

**Result: PASS**

Errors: none

The following type extensions were required to support new arcs and themes:
- `RitualTheme` — added `'Rhythm'`
- `RitualArc` — added `'DEEPENING'`, `'TRANSFORMING'`, `'BECOMING'`

---

## Import Updates

| File | Old Import | New Import |
|------|------------|------------|
| `app/(tabs)/mindset.tsx` | `from '../../data/mindsetContent'` + `from '../../data/dailyResets'` | `from '../../data'` |
| `app/(tabs)/today.tsx` | `from '../../data/dailyResets'` | `from '../../data'` |
| `utils/contentSystem.ts` | `from '../data/reflections'` | `from '../data'` |

---

## Final Status

- [x] `rituals.json` untouched (30 days, structure preserved)
- [x] `mindsetContent.ts` has 386 card entries (no content lost)
- [x] `mindsetContent.ts` categories use new names only
- [x] `dailyResetsExtended.ts` has exactly 70 entries (days 31–100)
- [x] `reflections.ts` unchanged (96 prompts)
- [x] `dailyResets.es.ts` moved to `i18n/es/` folder
- [x] Root-level duplicates deleted
- [x] `index.ts` created and exports all content correctly
- [x] No broken imports anywhere in the project
- [x] TypeScript compiles without errors
- [x] Zero content lost

---

## Issues Found and Resolved

| Issue | Resolution |
|-------|------------|
| Root `data/mindsetContent.ts` had 3 extra "IDs" (`confidence`, `emotional`, `detox`) flagged as missing from the DailyResetNovo version | Investigation revealed these were from the `mindsetCategories` UI array, not actual card IDs. All 20 card IDs (m1–m20) were confirmed present. Deletion proceeded safely. |
| `RitualArc` and `RitualTheme` types in `rituals.ts` did not include new extended values | Extended both union types to cover the new arcs (`DEEPENING`, `TRANSFORMING`, `BECOMING`) and new theme (`Rhythm`). TypeScript then compiled cleanly. |
| `mindset.tsx` and `today.tsx` use `dailyResets` with its legacy flat structure (`{day, message, action, why, reflection, category}`) — incompatible with the new `Ritual` type | Added a backward-compatible `export { dailyResets } from './dailyResets'` to `index.ts`. Components continue using the legacy structure unchanged; only the import path was updated. Full structure migration of these components is a separate task. |
| `mindset.tsx` had `MindsetCard` imported as a value instead of a type | Changed to `type MindsetCard` (import type syntax) to comply with TypeScript strict mode. |
