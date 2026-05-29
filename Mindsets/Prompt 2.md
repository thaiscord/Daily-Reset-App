FINAL GERMAN LOCALIZATION FIX — RESET RITUAL FLOW

German localization is still incomplete inside the Reset Ritual experience.

Current issue:
When selectedLanguage === "de", parts of the ritual still appear in English.

Examples visible:
- RESET RITUAL
- You are allowed to pause.
- Before the day closes — come back gently.
- Any ritual slide title
- Any ritual slide subtitle
- Any ritual instruction
- Any breathing guidance
- Any reflection prompt
- Any completion message
- Any transition text
- Any footer/helper text

Everything inside the ritual experience must be fully localized.

TASK

Audit the ENTIRE Reset Ritual system.

Search for:
- hardcoded English strings
- ritual arrays
- ritual content files
- ritual slides
- ritual steps
- ritual prompts
- ritual affirmations
- ritual completion screens
- ritual breathing screens
- ritual reflection screens
- ritual helper text
- ritual CTA labels

Move every string into i18n.

Do not allow English fallback when language = de.

IMPORTANT:
The ritual system contains multiple ritual variations.
Translate ALL ritual variations, not only the currently visible one.

This includes:
- Focus rituals
- Calm rituals
- Courage rituals
- Rest rituals
- Clarity rituals
- Momentum rituals
- Rhythm rituals
- Future ritual categories added later

GERMAN LOCALIZATION STYLE

Do NOT use:
- literal translations
- robotic wording
- AI sounding phrases
- motivational coach language

Use:
- natural native German
- calm emotional tone
- minimalist wellness language
- short elegant sentences
- language that feels written by a German copywriter

Examples:

"You are allowed to pause."
→
"Du darfst innehalten."

"Before the day closes — come back gently."
→
"Bevor der Tag endet — komm ruhig zurück."

"Continue when you're ready."
→
"Weiter, wenn du bereit bist."

"Take one slow breath."
→
"Nimm einen ruhigen Atemzug."

"Notice what is still here."
→
"Nimm wahr, was noch da ist."

"There is no rush."
→
"Es gibt keine Eile."

"Come back to yourself."
→
"Komm wieder bei dir an."

VALIDATION REQUIRED

After implementation:

1. Switch app language to German.
2. Launch every ritual variation manually.
3. Navigate through every ritual screen.
4. Verify:
   - zero English strings remain
   - zero fallback strings remain
   - zero raw i18n keys remain
   - every ritual screen is fully German
   - every completion screen is fully German
   - every reflection prompt is fully German

The German ritual experience must feel like it was originally written in German, not translated from English.