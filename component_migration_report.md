# Daily Reset — Component Migration Report

## Date
2026-05-15

---

## Objective

Migrate `today.tsx` and `mindset.tsx` from the legacy flat `DailyReset` structure to the new rich `Ritual` type, and remove the backward-compatibility shim from `data/index.ts`.

---

## Files Modified

| File | Type of Change |
|------|---------------|
| `DailyResetNovo/app/(tabs)/today.tsx` | Full migration to `Ritual` type |
| `DailyResetNovo/app/(tabs)/mindset.tsx` | Full migration to `Ritual` type |
| `DailyResetNovo/data/index.ts` | Removed backward-compat export |

---

## Step 1 — Audit

### today.tsx — Legacy Fields Used

| Field | Location | New Equivalent |
|-------|----------|----------------|
| `dailyResets.find(d => d.day === ...)` | lines 217–218 | `getDayContent(day)` |
| `typeof dailyResets[0]` | lines 758, 849, 946 (prop types) | `Ritual` |
| `.day` | dayData, tomorrowData | `.day` (unchanged) |
| `.category` | catColors lookup, pill text | `.theme` |
| `.message` | DailyResetCard body, tomorrow teaser | `.home_card.headline` |
| `.action` | Section content | `.today_action.content` |
| `.why` | Section content | `.why_it_matters.content` |
| `.reflection` | Section content | `.reflection.content` |

### mindset.tsx — Legacy Fields Used

| Field | Location | New Equivalent |
|-------|----------|----------------|
| `dailyResets` (array) | `buildCardDayMap()`, `buildSortedAll()` | `[...rituals, ...dailyResetsExtended]` |
| `day.category` | both builder functions | `day.theme` |
| `day.day` | `buildCardDayMap()` | `day.day` (unchanged) |

---

## Step 2 — today.tsx Changes

### Import
```typescript
// Before
import { dailyResets } from '../../data';

// After
import { getDayContent, type Ritual } from '../../data';
```

### Day lookup
```typescript
// Before
const dayData      = dailyResets.find(d => d.day === progress.currentDay) ?? dailyResets[0];
const tomorrowData = dailyResets.find(d => d.day === progress.currentDay + 1) ?? null;

// After
const dayData      = getDayContent(progress.currentDay) ?? getDayContent(1)!;
const tomorrowData = getDayContent(progress.currentDay + 1) ?? null;
```

### TypeScript type annotations
```typescript
// Before (3 locations)
typeof dailyResets[0]

// After
Ritual
```

### DailyResetCard field accesses
```typescript
// Before
catColors[data.category]    →  catColors[data.theme]
data.category               →  data.theme
data.message                →  data.home_card.headline
data.action                 →  data.today_action.content
data.why                    →  data.why_it_matters.content
data.reflection             →  data.reflection.content
```

### TomorrowAnticipationCard / CompletedCard
```typescript
// Before
tomorrow.category   →  tomorrow.theme
tomorrow.message    →  tomorrow.home_card.headline
```

### Category color/label maps updated

All six maps (`tomorrowCatColorMap`, `tomorrowCatBgMap`, `tomorrowCatLabelMap`, `tomorrowCatLabel`, `tomorrowCatColor`, `tomorrowCatBg`, `catColors`) updated from old lowercase keys to new capitalized `RitualTheme` keys:

| Old Key | New Key |
|---------|---------|
| `focus` | `Focus` |
| `discipline` | `Rhythm` |
| `confidence` | `Courage` |
| `productivity` | `Momentum` |
| `emotional` | `Calm` |
| `detox` | `Clarity` |
| *(new)* | `Rest` |
| *(new)* | `Discipline` |

---

## Step 3 — mindset.tsx Changes

### Import
```typescript
// Before
import { mindsetCards, mindsetCategories, type MindsetCard, dailyResets } from '../../data';

// After
import { mindsetCards, mindsetCategories, rituals, dailyResetsExtended, type MindsetCard } from '../../data';
```

### Removed stale alias/mapping code
- `CATEGORY_ALIAS` — removed (was mapping old UI tab IDs to old internal category names)
- `getCatDisplayLabel()` — removed (was converting old internal names to display labels)
- Both are no longer needed because `card.category` is now the same capitalized value as the UI tab ID

### buildCardDayMap and buildSortedAll
```typescript
// Before
for (const day of dailyResets) {
  const cat = day.category;

// After
for (const day of [...rituals, ...dailyResetsExtended]) {
  const cat = day.theme;
```

This expands coverage from 100 days to all available days and aligns category matching (both `card.category` and `day.theme` now use the same capitalized names).

### Category filter in useMemo
```typescript
// Before
const resolvedCat = CATEGORY_ALIAS[activeCat] ?? activeCat;
mindsetCards.filter(c => c.category === resolvedCat)

// After
mindsetCards.filter(c => c.category === activeCat)
```

### Card/modal rendering
```typescript
// Before
catBg[getCatDisplayLabel(card.category)] ?? catBg[card.category]
catColors[getCatDisplayLabel(card.category)] ?? catColors[card.category]
{getCatDisplayLabel(card.category)}

// After
catBg[card.category]
catColors[card.category]
{card.category}
```

### catColors and catBg keys updated to capitalized RitualTheme names

---

## Step 4 — Removed Backward-Compat Export

```typescript
// Removed from data/index.ts:
export { dailyResets } from './dailyResets';
```

The `dailyResets.ts` source file is retained (it was the basis for `dailyResetsExtended.ts`) but is no longer exported or imported by any component.

---

## Step 5 — Validation

### No remaining legacy `dailyResets` imports in components
```
grep "from '.*dailyResets'" → only ./dailyResetsExtended in data/index.ts (correct)
grep "data\.(message|action|why|category)" → no matches
grep "tomorrow\.(message|category)" → no matches
```

### TypeScript compilation
**Result: PASS** — `npx tsc --noEmit` exits with no output (zero errors, zero warnings)

---

## Content Audit

| Feature | Before | After | Correct? |
|---------|--------|-------|----------|
| Today card renders headline | `data.message` (flat string) | `data.home_card.headline` (Ritual) | ✓ |
| Today card renders action | `data.action` | `data.today_action.content` | ✓ |
| Today card renders why | `data.why` | `data.why_it_matters.content` | ✓ |
| Today card renders reflection | `data.reflection` | `data.reflection.content` | ✓ |
| Tomorrow teaser | `tomorrowData.message` | `tomorrowData.home_card.headline` | ✓ |
| Tomorrow category pill | `tomorrow.category` (lowercase) | `tomorrow.theme` (capitalized) | ✓ |
| Category colors/labels | keyed by old lowercase names | keyed by new RitualTheme names | ✓ |
| Mindset card-day map | 100 days from flat array | 100 days from rituals + extended | ✓ |
| Mindset category filter | via CATEGORY_ALIAS + getCatDisplayLabel | direct card.category match | ✓ |
| TypeScript prop types | `typeof dailyResets[0]` | `Ritual` | ✓ |

---

## Issues Found and Resolved

| Issue | Resolution |
|-------|------------|
| `tomorrowCatColorMap`, `tomorrowCatBgMap`, `tomorrowCatLabelMap` (and their duplicates in CompletedCard) had keys for old lowercase category names | All six maps updated with capitalized `RitualTheme` keys. Added missing `Rest` and `Discipline` entries. |
| `catColors` in `DailyResetCard` used old lowercase keys | Updated to capitalized keys with corrected color mapping. |
| `CATEGORY_ALIAS` in mindset.tsx mapped UI tab IDs to old internal category names (e.g. `calm → 'emotional'`) | Removed entirely — after category remapping in migration, `card.category` IS the UI display name. |
| `getCatDisplayLabel()` in mindset.tsx converted old internal names to display names | Removed entirely — no conversion needed anymore. |
| `mindset.tsx` `catColors`/`catBg` had both old lowercase and new mixed-case keys (redundant entries) | Replaced with clean set of capitalized RitualTheme keys only. |
| Backward-compat `export { dailyResets }` in index.ts was still present | Removed after confirming no component imports it. |

---

## Final Status

- [x] `today.tsx` imports `getDayContent` and `Ritual` — no `dailyResets`
- [x] `mindset.tsx` imports `rituals` and `dailyResetsExtended` — no `dailyResets`
- [x] All field accesses updated to Ritual structure
- [x] All category color/label maps use new capitalized RitualTheme keys
- [x] `CATEGORY_ALIAS` and `getCatDisplayLabel` removed from mindset.tsx
- [x] Backward-compat export removed from `data/index.ts`
- [x] No remaining `dailyResets` imports in any component
- [x] TypeScript compiles without errors
- [x] Zero content lost
