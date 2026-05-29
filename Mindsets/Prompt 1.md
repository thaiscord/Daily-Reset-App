FINAL GERMAN LOCALIZATION BUGFIX — NO RAW KEYS, NO ENGLISH

German language is still broken in Profile/You and legal/settings modals.

Fix all remaining German i18n issues.

VISIBLE BUGS:
1. Raw translation keys are appearing:
- profile.transform.zero.title
- profile.transform.zero.sub

This means missing German keys or wrong t() path. Raw keys must NEVER appear in UI.

2. English still appears in German Profile/You:
- Focus & Discipline
- Protecting your attention.
- Morning • 7:00 AM

3. German modal “Dein Rückweg” still has English options:
- Focus & Discipline
- Reduce distractions and build consistency.
- Calm & Mental Clarity
- Slow down mentally and feel more grounded.
- Self-Confidence
- Rebuild trust in yourself little by little.
- Burnout Recovery
- Recover from exhaustion without pressure.

4. Privacy Policy modal title is German, but full body is still English.
5. Terms of Use modal title is German, but full body is still English.
6. “Last updated: May 2026” is still English.

TASK:
When selectedLanguage === "de", absolutely every visible string in Profile/You, settings, modals, privacy policy, terms of use, transformation section, return path modal, notification settings and purchase-related labels must be German.

Do a complete codebase search for:
- profile.transform.zero
- Focus & Discipline
- Protecting your attention
- Reduce distractions
- Calm & Mental Clarity
- Self-Confidence
- Burnout Recovery
- Last updated
- Introduction
- Information We Collect
- How We Use Your Information
- Acceptance of Terms
- Description of Service
- User Accounts
- Morning
- May 2026

Move every hardcoded string into i18n or replace with t() correctly.

GERMAN COPY TO USE:

profile.transform.zero.title:
"Erster Schritt"

profile.transform.zero.sub:
"Alles beginnt leise."

Full experience button:
"Volle Erfahrung freischalten"

Profile subtitle:
"Tag 1 deiner Reset-Reise."

Return path labels:
"Fokus & Disziplin"
"Schütze deine Aufmerksamkeit."

"Ruhe & Klarheit"
"Komm innerlich zur Ruhe und finde wieder Boden."

"Selbstvertrauen"
"Finde Schritt für Schritt zurück zu dir."

"Erholung nach Erschöpfung"
"Erhole dich ohne Druck."

Settings:
"Benachrichtigungszeit"
"Morgens • 7:00"
"Sprache"
"Kauf wiederherstellen"
"Datenschutzrichtlinie"
"Nutzungsbedingungen"
"Meine Daten löschen"

Legal date:
"Zuletzt aktualisiert: Mai 2026"

Privacy Policy German content:
1. Einführung
"Willkommen bei Daily Reset. Deine Privatsphäre ist uns wichtig. Diese Datenschutzrichtlinie erklärt klar, wie deine Informationen behandelt werden, wenn du die Daily Reset App nutzt."

2. Welche Informationen wir speichern
"Daily Reset ist so gestaltet, dass deine Privatsphäre geschützt bleibt. Daten, die du eingibst — wie ausgewählte Ziele, Benachrichtigungseinstellungen, tägliche Fortschritte, Reflexionen und Reset-Verläufe — werden lokal auf deinem Gerät gespeichert."

3. Wie wir deine Informationen nutzen
"Die lokal gespeicherten Informationen werden nur genutzt, um deine Daily Reset Erfahrung persönlicher zu machen, deinen Fortschritt anzuzeigen, passende tägliche Inhalte bereitzustellen und lokale Benachrichtigungen zu planen."

4. Weitergabe von Daten
"Wir verkaufen deine persönlichen Daten nicht. Wir geben deine privaten Reflexionen nicht an Dritte weiter."

5. Deine Kontrolle
"Du kannst deine Daten jederzeit in den Einstellungen löschen. Wenn du deine Daten löschst, werden gespeicherte Fortschritte und Reflexionen entfernt."

Terms German content:
1. Annahme der Bedingungen
"Durch die Nutzung von Daily Reset stimmst du diesen Nutzungsbedingungen zu. Wenn sich etwas für dich nicht richtig anfühlt, nutze die App bitte nicht weiter."

2. Beschreibung des Dienstes
"Daily Reset ist eine App für tägliche Reflexion, sanfte Routinen und persönliche Rückkehr. Sie soll dich unterstützen, kleine Schritte zu machen, ohne Druck aufzubauen."

3. Kein medizinischer Ersatz
"Daily Reset ersetzt keine medizinische, psychologische oder therapeutische Behandlung. Wenn du dich in einer akuten Krise befindest oder professionelle Hilfe brauchst, wende dich bitte an qualifizierte Fachpersonen oder lokale Notfalldienste."

4. Nutzung der App
"Du bist dafür verantwortlich, die App auf eine Weise zu nutzen, die für dich sicher und passend ist. Du kannst jederzeit pausieren."

5. Änderungen
"Wir können diese Bedingungen gelegentlich aktualisieren. Die aktuelle Version wird in der App angezeigt."

IMPORTANT:
- Do not leave English fallback visible for German.
- Do not show raw i18n keys.
- Add missing German keys instead of relying on English.
- Search the entire project for remaining hardcoded English strings shown in Profile/You and legal modals.
- After changes, run the app with German selected and verify: no English and no raw keys visible.