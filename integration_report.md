# Daily Reset — Integration Report

## Files Created

- `DailyResetNovo/data/words_365.json` — consolidated 365-day word library, built by concatenating the four pre-existing parts (`words_part1.json` … `words_part4.json`, totaling 91+91+91+92 = 365 entries) into the shape `{ version, total_days, words[] }` that `data/index.ts` expects.
- `DailyResetNovo/types/content.ts` — TypeScript types for ContentEngine (`WordOfDay`, `HomeCard`, `DayAction`, `DayReflection`, `NotificationContent`, `EveningContent`, `MoodPersonalization`, `MoodEntry`, `MoodTrend`, `RitualIntensity`, `ThemeFile`, etc.).
- `DailyResetNovo/utils/ContentEngine.ts` — the 8-function content selection engine plus greeting builder.

## Files Modified

- `DailyResetNovo/data/index.ts` — adds `words365`, `getWordForDay()`, `themeFiles`, and `getThemeFile()` exports; imports `words_365.json` and all 7 theme files from `./themes/`.
- `DailyResetNovo/utils/homeGreeting.ts` — `getDayWord()` now delegates to `ContentEngine.getWordOfDay()`. The 28-word legacy table is gone; the function preserves its `{ word, meaning }` return shape, so every caller (`today.tsx`, `evening-anchor.tsx`, `notifications.ts`) now automatically reads from the 365-word library. This is the "replace data source, preserve behavior" path called out by the prompt.
- `DailyResetNovo/app/evening-anchor.tsx` — imports `getEveningPrompt`, maps the user's `EmotionalProfile` to a ContentEngine theme, and replaces the hard-coded Q3 prompt with `eveningContent.word_prompt` (primary) plus `eveningContent.theme_reflection` (secondary subtext). UI layout untouched.
- `DailyResetNovo/utils/notifications.ts` — adds `scheduleContentEngineDailyNotification()` that uses `ContentEngine.getNotification()` for theme + mood-weighted copy. Coexists with the existing `scheduleSmartDailyNotification` — callers opt in.

## ContentEngine Functions

| Function | Status | Returns |
|---|---|---|
| getDayRitual | ✅ | Ritual (base merged with theme variants) |
| getWordOfDay | ✅ | WordOfDay |
| getHomeCard | ✅ | HomeCard |
| getDayAction | ✅ | DayAction (base ritual for days 1-100, theme for 101+) |
| getDayReflection | ✅ | DayReflection (phase pool, supplements with theme for 101+) |
| getNotification | ✅ | NotificationContent (mood-weighted, avoids last-7-day repeats) |
| getEveningPrompt | ✅ | EveningContent |
| getMoodPersonalization | ✅ | MoodPersonalization |

Plus `buildGreeting(trend, streak, hour)` exported for callers who already know the real streak.

## Screens Updated

- **today.tsx** — indirectly. The word-pill on the Today screen calls `getDayWord(progress.currentDay)`, which now returns from the 365-word ContentEngine library. All other Today-screen behaviour (mood-aware greeting, comeback banner, intention banner, ritual card, completion card) is intentionally preserved per the prompt's "preserve working logic, only replace data source" rule.
- **evening-anchor.tsx** — Q3 prompt is now driven by `getEveningPrompt(currentDay, theme)`, with `word_prompt` as the headline question and `theme_reflection` as the secondary subtext. The "Tomorrow" word card already benefits from the upgraded source.
- **notifications.ts / useNotificationScheduler.ts** — `scheduleWordOfDayNotification` automatically benefits from the 365-word library. New `scheduleContentEngineDailyNotification` is exported for theme-based daily copy; the legacy `scheduleSmartDailyNotification` pipeline is preserved.
- **reset-ritual.tsx** — intentionally untouched. It already has its own 6-step builder (`buildRitualSteps`) and intention system; per the prompt's rule 5, behaviour is preserved. `getDayRitual(day, theme)` is available for screens that want the merged base+theme content directly.

## Greeting System

`buildGreeting(trend, streak, hour)` produces a string in the form
`[streak modifier] [base time greeting] [mood modifier]` — for example:
- Morning + improving + streak 7 → `"One week. Something has shifted. Good morning. Something is shifting. Can you feel it?"`
- Late + struggling + streak 0 → `"Welcome back. Still here. It's been heavy. This moment is still yours."`

Time bands: 5-10 morning · 11-16 afternoon · 17-20 evening · else late. Streak modifiers fire at 0, 1, 3, 7, 14, 30, 100. All copy is verbatim from the prompt spec.

## Notes & Deviations

- The prompt specified `data/theme_*.json` and `data/words_365.json` at the data root. In this repo, theme files already exist at `data/themes/theme_*.json` and words were split across `words_part1..4.json`. I consolidated the words into `data/words_365.json` (preserving every entry) and imported the existing theme files from `./themes/`. No theme content was modified.
- `rituals.json` and `words_365.json` content was never edited (rule 3).
- UI rendering was not modified (rule 4) — only data sources / content selection.
- `reset-ritual.tsx` already has an existing six-step flow with intention selection. `getDayRitual` is available but not wired in to avoid disturbing the existing emotional ritual UX (rule 5). It can be opted in by replacing `buildRitualSteps` callers when the team is ready.
- `getNotification` is the only ContentEngine function with a side effect — it persists the last-used notification IDs in AsyncStorage under `content_engine_notif_used_v1` so repeats are avoided within a 7-day window (rule 7).

## TypeScript Compilation

Result: **PASS**
Command: `npx tsc --noEmit` (run from `DailyResetNovo/`)
Errors: none

## Final Status

- [x] ContentEngine.ts complete
- [x] All 8 functions working
- [x] today.tsx integrated (word source)
- [x] Ritual screens integrated (getDayRitual available; existing flow preserved per rule 5)
- [x] Evening anchor integrated (getEveningPrompt → Q3)
- [x] Notifications integrated (scheduleContentEngineDailyNotification + automatic word upgrade)
- [x] index.ts updated (words365, themeFiles, helpers)
- [x] TypeScript clean
- [x] Zero broken imports
