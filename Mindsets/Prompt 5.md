# DAILY RESET — ADD i18n SUPPORT TO RETURNING USER EXPERIENCE

Update the Returning User Experience / Welcome Back Flow to fully support the existing i18n system.

IMPORTANT:
The new returning user onboarding screen must automatically use the language previously selected by the user.

If the user selected:

* English → show the returning experience in English.
* Portuguese → show the returning experience in Portuguese.
* Spanish → show the returning experience in Spanish.
* French → show the returning experience in French.
* German → show the returning experience in German.

Do NOT hardcode English strings inside the component.

All text must come from the existing i18n translation structure.

━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━

1. Locate the current i18n system already used in the app.

2. Add a new translation namespace/section for the Returning User Experience.

Suggested structure:

returningExperience: {
normalReturn: [...],
afterInactivity: [...],
afterConsistency: [...],
firstOpenOfDay: [...],
lateNight: [...]
}

3. The component must read the active language from the existing app language state/storage.

4. The returning screen must render messages using the selected language automatically.

5. Do not create a separate language selector for this screen.

6. Do not duplicate translation logic.

7. Do not bypass the existing i18n system.

8. Keep all copy emotionally consistent across languages.

The translation must feel native, calm and premium — not literal, robotic or Google Translate style.

━━━━━━━━━━━━━━━━━━━━━━━
COPY DIRECTION BY LANGUAGE
━━━━━━━━━━━━━━━━━━━━━━━

ENGLISH:
Use soft, calm, minimal emotional language.

PORTUGUESE:
Use natural Brazilian Portuguese.
Avoid overly motivational phrases.
Keep it warm, quiet and human.

SPANISH:
Use neutral natural Spanish.
Avoid exaggerated self-help tone.
Keep it elegant and emotionally soft.

FRENCH:
Use natural French with a premium wellness tone.
Avoid literal English structures.
Keep it refined and calm.

GERMAN:
Use natural German.
Avoid stiff robotic translations.
Keep it clear, warm and grounded.

━━━━━━━━━━━━━━━━━━━━━━━
EXAMPLE TRANSLATIONS
━━━━━━━━━━━━━━━━━━━━━━━

ENGLISH:
normalReturn:

* “Welcome back.”
* “Let’s begin gently.”
* “A small pause for yourself.”
* “One quiet moment.”
* “You’re here.”

PORTUGUESE:
normalReturn:

* “Que bom te ver de novo.”
* “Vamos começar com calma.”
* “Uma pequena pausa só sua.”
* “Um momento em silêncio.”
* “Você voltou.”

SPANISH:
normalReturn:

* “Qué bueno verte de nuevo.”
* “Empecemos con calma.”
* “Una pequeña pausa para ti.”
* “Un momento tranquilo.”
* “Estás aquí.”

FRENCH:
normalReturn:

* “Heureux de te revoir.”
* “Commençons doucement.”
* “Une petite pause pour toi.”
* “Un moment au calme.”
* “Tu es là.”

GERMAN:
normalReturn:

* “Schön, dass du wieder da bist.”
* “Fangen wir ruhig an.”
* “Eine kleine Pause nur für dich.”
* “Ein stiller Moment.”
* “Du bist da.”

━━━━━━━━━━━━━━━━━━━━━━━
AFTER INACTIVITY EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━━

ENGLISH:

* “You can always begin again.”
* “No pressure. Just today.”
* “There’s nothing to catch up on.”
* “Welcome back to yourself.”
* “Still here. Still yours.”

PORTUGUESE:

* “Você sempre pode recomeçar.”
* “Sem pressão. Só hoje.”
* “Não há nada para compensar.”
* “Bem-vinda de volta para si.”
* “Ainda aqui. Ainda seu.”

SPANISH:

* “Siempre puedes volver a empezar.”
* “Sin presión. Solo hoy.”
* “No hay nada que recuperar.”
* “Vuelve a ti, con calma.”
* “Sigue aquí. Sigue siendo tuyo.”

FRENCH:

* “Tu peux toujours recommencer.”
* “Sans pression. Juste aujourd’hui.”
* “Rien à rattraper.”
* “Reviens doucement à toi.”
* “Toujours là. Toujours à toi.”

GERMAN:

* “Du kannst jederzeit neu beginnen.”
* “Kein Druck. Nur heute.”
* “Du musst nichts nachholen.”
* “Willkommen zurück bei dir.”
* “Noch da. Noch deins.”

━━━━━━━━━━━━━━━━━━━━━━━
AFTER CONSISTENCY EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━━

ENGLISH:

* “Quiet progress.”
* “You’ve been showing up for yourself.”
* “Small steps still matter.”
* “Consistency can be soft.”
* “A calmer rhythm.”

PORTUGUESE:

* “Progresso silencioso.”
* “Você tem aparecido por você.”
* “Pequenos passos ainda contam.”
* “Constância também pode ser leve.”
* “Um ritmo mais calmo.”

SPANISH:

* “Progreso silencioso.”
* “Has estado presente para ti.”
* “Los pasos pequeños también importan.”
* “La constancia también puede ser suave.”
* “Un ritmo más tranquilo.”

FRENCH:

* “Un progrès discret.”
* “Tu continues à être là pour toi.”
* “Les petits pas comptent aussi.”
* “La constance peut être douce.”
* “Un rythme plus apaisé.”

GERMAN:

* “Leiser Fortschritt.”
* “Du bist für dich da geblieben.”
* “Kleine Schritte zählen auch.”
* “Beständigkeit darf sanft sein.”
* “Ein ruhigerer Rhythmus.”

━━━━━━━━━━━━━━━━━━━━━━━
QUALITY RULES
━━━━━━━━━━━━━━━━━━━━━━━

Before finishing, verify:

* No returning experience text is hardcoded in English.
* All strings exist in every supported language.
* The selected language persists correctly.
* The screen updates automatically when language changes.
* The tone remains calm, premium and human in all languages.
* No phrase sounds like generic motivational coaching.
* No phrase sounds like machine translation.
* No phrase creates guilt after inactivity.
* No phrase pressures the user to be productive.

The result should feel native in every language and fully integrated with Daily Reset’s existing i18n architecture.
