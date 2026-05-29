CORRIGIR TRADUÇÃO DA CATEGORIA NO PREVIEW DA ABA DIÁRIO

Na aba Diário, o card/resumo da reflexão está exibindo a categoria do mindset em inglês no preview, por exemplo “Focus”, mesmo quando o idioma do app está em português.

Dentro do detalhe do registro, a categoria aparece corretamente como “Foco”, então o problema está apenas no preview/listagem da aba Diário.

Corrija para que o preview do Diário use sempre o label traduzido da categoria, e nunca o valor interno/raw.

Regras:
- Não exibir category, slug, id ou value bruto como “Focus”, “Calm”, “Rest”, “Clarity”, “Rhythm”, etc.
- Usar sempre a função/helper de tradução da categoria.
- Em português: Focus = Foco.
- Em inglês: Focus = Focus.
- Em espanhol: Focus = Enfoque ou a tradução já definida no i18n.
- Em francês: Focus = Focus ou a tradução nativa já definida.
- Em alemão: Focus = Fokus.
- Aplicar isso em todos os cards/listagens do Diário, não apenas no detalhe.
- Verificar também os chips/badges pequenos do Diário, cards de resumo e qualquer linha onde aparece a categoria.
- Não alterar layout, espaçamento, cores, estrutura ou dados salvos.
- Apenas corrigir a renderização do texto para usar i18n.

Implementação esperada:
Criar ou reutilizar um helper tipo:

getLocalizedCategoryLabel(categoryKey, locale)

E substituir qualquer uso direto de:
category
categoryName
mindsetCategory
entry.category

por:
getLocalizedCategoryLabel(entry.category, currentLocale)

Também garantir fallback seguro:
- se não encontrar tradução, usar português ou inglês apenas como fallback interno;
- nunca mostrar chave técnica quebrada.

Teste:
1. Abrir app em português.
2. Criar registro com categoria Focus/Foco.
3. Ir em Diário.
4. Confirmar que no card aparece “Foco”, não “Focus”.
5. Abrir o detalhe do card e confirmar que continua “Foco”.
6. Repetir rapidamente em francês e alemão para garantir que o preview também traduz.