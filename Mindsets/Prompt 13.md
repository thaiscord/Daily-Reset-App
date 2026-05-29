BUG FIX — Reset Data must work on Web/Vercel

Fix the “Reset my data / Resetar meus dados” action so it fully resets the app when running on web/Vercel.

Current issue:
On the web app, clicking “Resetar meus dados” does not actually reset the app state.

Requirements:
1. The reset action must clear all persisted user data, including:
- onboarding completion
- selected language
- selected recovery path / user mode
- daily reset progress
- streak data
- mindset unlock/progress data
- journal/reflection history
- notification preferences
- ritual memory/progress
- any local storage/AsyncStorage keys used by the app

2. Support both environments:
- React Native / Expo Go
- Web browser / Vercel

3. For web:
- clear all relevant localStorage keys
- clear all relevant AsyncStorage-backed keys
- after reset, force the app to return to the initial onboarding/language selection screen
- refresh/reinitialize app state so old data does not remain visible

4. Do not break native Expo behavior.

5. Do not change the layout, design, colors, or app structure.

6. Add a single centralized reset function, for example:
clearAllUserData()
and use it from the Profile/You reset button.

7. After reset, the user must see the app exactly as a first-time user.

8. Test:
- complete onboarding
- do one reset
- create one journal/reflection entry
- go to You/Profile
- tap Resetar meus dados
- confirm
- app must return to the beginning
- reopening the browser must still show a clean first-time state

Important:
Do not leave any hardcoded English text in the reset flow. Use i18n for all confirmation messages.