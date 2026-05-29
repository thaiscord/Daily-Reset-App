CORRIGIR LIBERAÇÃO DOS MINDSETS: PREMIUM SEM PAYWALL, MAS COM PROGRESSÃO DIÁRIA

O paywall foi removido corretamente. Porém agora todos os mindsets de todas as categorias ficaram liberados de uma vez. Isso está errado para a proposta do Daily Reset.

Objetivo:
Manter o app sem paywall e com acesso premium liberado, mas restaurar a lógica central do produto: liberar apenas 1 novo mindset por dia.

Importante:
Premium NÃO significa ver todos os mindsets de uma vez.
Premium significa ter acesso ao ritual, categorias e experiência completa, mas o conteúdo deve continuar sendo revelado progressivamente, dia após dia.

FAZER:

1. Restaurar a progressão diária dos mindsets
- Cada usuário deve ver apenas os mindsets já liberados conforme os dias de uso/reset.
- No Dia 1: mostrar apenas o mindset do Dia 1.
- No Dia 2: liberar o mindset do Dia 2.
- No Dia 3: liberar o mindset do Dia 3.
- E assim por diante.
- Não liberar todos os 385 mindsets de uma vez.

2. Remover bloqueio por paywall, mas manter bloqueio por tempo/progresso
- Cards futuros não devem mostrar “PRO”.
- Cards futuros não devem abrir paywall.
- Cards futuros devem aparecer como “chega no momento certo”, “libera amanhã”, “próximo reset”, ou equivalente conforme idioma.
- O bloqueio agora é emocional/progressivo, não comercial.

3. Ajustar categorias da aba Mindset
Quando o usuário tocar em uma categoria como:
- Foco
- Calma
- Coragem
- Descanso
- Clareza
- Impulso
- Ritmo

Não mostrar todos os cards da categoria de uma vez.

Mostrar somente:
- o mindset do dia disponível para aquela categoria;
- ou os mindsets já desbloqueados até o dia atual;
- e os próximos como cards futuros suaves, sem abrir paywall.

4. Lógica ideal
Criar uma função central, por exemplo:

getUnlockedMindsetsByDay(userDay, category)

Essa função deve:
- receber o dia atual do usuário;
- receber a categoria selecionada;
- retornar apenas os mindsets desbloqueados até aquele dia;
- nunca depender de isPremium para liberar tudo;
- usar isPremium apenas para permitir acesso à experiência, não para desbloquear todo o acervo.

5. Seleção contextual
Quando a pessoa seleciona no Today um estado como:
- mente acelerada;
- cansada;
- sobrecarregada;
- sem clareza;
- sem energia;

O app pode escolher um mindset compatível com esse estado emocional, mas ainda respeitando a progressão diária.

Exemplo:
Se o usuário está no Dia 2 e escolheu “sem energia”, o app pode mostrar um mindset de Descanso ou Ritmo correspondente ao Dia 2, mas não pode liberar todos os mindsets de Descanso.

6. Estados futuros
Para mindsets ainda não liberados, usar textos suaves como:
- “Chega amanhã.”
- “Um por dia.”
- “Seu próximo momento aparece no tempo certo.”
- “Volte amanhã para o próximo.”
- “O caminho aparece aos poucos.”

Adaptar esses textos ao idioma selecionado usando i18n.

7. Remover qualquer dependência de paywall
- Nenhum card futuro deve abrir paywall.
- Nenhum card deve ter cadeado PRO.
- Nenhum card deve mostrar plano, assinatura ou trial.
- O usuário não deve sentir que falta pagar.
- Deve sentir apenas que o app funciona como uma jornada diária.

8. Validar
Testar:
- Dia 1: apenas mindset do Dia 1 disponível.
- Dia 2: Dia 1 e Dia 2 disponíveis.
- Categoria Foco: não mostra todos de uma vez.
- Categoria Descanso: não mostra todos de uma vez.
- Categoria Calma: não mostra todos de uma vez.
- Cards futuros não abrem paywall.
- Cards futuros não mostram PRO.
- Idiomas PT, EN, ES, FR e DE continuam funcionando.

Resultado esperado:
O app continua premium e sem paywall, mas mantém a sensação de ritual diário, descoberta diária e retenção. O conteúdo não deve parecer uma biblioteca inteira aberta de uma vez. Deve parecer uma jornada emocional liberada aos poucos.