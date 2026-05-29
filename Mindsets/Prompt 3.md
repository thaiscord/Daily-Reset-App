FIX FINAL — GERMAN AFTER-RESET COMPLETION SCREENS

Ainda existem telas pós-reset aparecendo em inglês quando o idioma selecionado é alemão.

Problema visível:
- RESET RITUAL
- You are allowed to pause.
- Before the day closes — come back gently.

Isso acontece depois de completar o reset do dia, então provavelmente essas telas não estão usando o mesmo conteúdo i18n do ritual principal.

Tarefa:
Audite e corrija TODAS as telas pós-reset / after reset / completed reset / completion flow.

Quando selectedLanguage === "de", absolutamente nada pode aparecer em inglês.

Substituições obrigatórias:
- RESET RITUAL → RESET-RITUAL
- You are allowed to pause. → Du darfst innehalten.
- Before the day closes — come back gently. → Bevor der Tag endet — komm ruhig zurück.
- Continue when ready → Weiter, wenn du bereit bist.
- Carry this with you → Nimm das mit.
- Reset complete → Reset abgeschlossen.
- You came back. → Du bist zurückgekommen.
- That is already something real. → Das ist schon etwas Echtes.
- One breath changes more than you think. → Ein Atemzug verändert mehr, als du denkst.

Importante:
Não corrigir só essa tela específica.
Procurar no código por TODOS os textos hardcoded em inglês relacionados a:
- reset completion
- completed ritual
- after reset
- post reset
- ritual complete
- reset done
- completion slides
- final ritual cards
- tomorrow card after reset
- reflection prompt after reset
- daily completion feedback

Mover tudo para i18n.

Validação obrigatória:
1. Selecionar idioma alemão.
2. Fazer o reset do dia.
3. Avançar até TODAS as telas depois da conclusão.
4. Confirmar que não existe nenhuma frase em inglês.
5. Confirmar que não aparece nenhuma chave crua tipo profile.transform.zero.title.
6. Confirmar que não existe fallback para inglês quando o idioma é alemão.

Regra final:
Com idioma alemão selecionado, toda a experiência depois do reset precisa parecer escrita originalmente em alemão.