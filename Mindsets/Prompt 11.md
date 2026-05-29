CORRIGIR PERGUNTA DO “SEU ESPAÇO PARTICULAR” CONFORME O CAMINHO DE RECUPERAÇÃO

Na aba Progresso, existe o card “Seu espaço particular” com uma pergunta/reflexão.

Hoje essa pergunta aparece genérica, por exemplo:
“Qual momento trouxe um pouco de calma hoje?”

Mas essa pergunta precisa mudar de acordo com o caminho escolhido pelo usuário na aba Você > Seu caminho de recuperação.

Não alterar layout, cores, estrutura, cards ou navegação. Corrigir apenas a lógica e o conteúdo exibido.

REGRAS

1. Usar o caminho selecionado pelo usuário como fonte principal:
- Foco e disciplina
- Calma e clareza mental
- Autoconfiança
- Recuperação do Burnout

2. A pergunta do card “Seu espaço particular” deve ser contextual.

Use estas frases em português:

FOCO E DISCIPLINA:
Título do card mantém:
“Um lugar tranquilo para soltar o que está pesado.”
Pergunta:
“O que mais desviou sua atenção hoje?”

CALMA E CLAREZA MENTAL:
Pergunta:
“O que ficou mais claro quando você desacelerou?”

AUTOCONFIANÇA:
Pergunta:
“Que pequena escolha mostrou que você ainda está tentando?”

RECUPERAÇÃO DO BURNOUT:
Pergunta:
“O que drenou sua energia hoje?”

3. O placeholder do campo pode continuar:
“Você pode deixar isso aqui.”

4. Quando o usuário trocar o caminho na aba Você, a pergunta da aba Progresso deve atualizar imediatamente ou no próximo render sem precisar resetar o app.

5. Não usar pergunta aleatória nessa área quando existe um caminho selecionado.

6. Se nenhum caminho estiver selecionado, usar fallback:
“O que você não quer carregar para amanhã?”

7. Garantir i18n:
- Criar keys específicas para essas perguntas.
- Não deixar texto hardcoded direto no componente.
- Preparar as mesmas keys para pt, en, es, fr e de.
- Se ainda não houver tradução perfeita em todos os idiomas, pelo menos manter a estrutura pronta e não quebrar.

SUGESTÃO DE KEYS

progress.privateSpace.prompt.focusDiscipline
progress.privateSpace.prompt.calmClarity
progress.privateSpace.prompt.selfConfidence
progress.privateSpace.prompt.burnoutRecovery
progress.privateSpace.prompt.default

IMPORTANTE

Verificar onde o caminho escolhido está salvo atualmente, provavelmente algo como:
selectedRecoveryPath
recoveryPath
userPath
profile.recoveryPath
selectedJourney

Usar exatamente esse valor salvo para decidir a pergunta.

Também verificar se os valores internos estão em inglês, português ou slug, por exemplo:
focus_discipline
calm_clarity
self_confidence
burnout_recovery

Criar um mapper seguro entre valor interno e pergunta correta.

TESTE FINAL

1. Selecionar “Autoconfiança” na aba Você.
2. Ir para Progresso.
3. Confirmar que aparece:
“Que pequena escolha mostrou que você ainda está tentando?”

4. Trocar para “Recuperação do Burnout”.
5. Voltar para Progresso.
6. Confirmar que aparece:
“O que drenou sua energia hoje?”

7. Confirmar que nada visual mudou além do texto da pergunta.
MELHORIA IMPORTANTE

A pergunta NÃO deve ser fixa.

Criar um banco de perguntas para cada caminho de recuperação.

Objetivo:
- evitar repetição;
- aumentar sensação de personalização;
- manter o app humano;
- gerar reflexão genuína sem parecer coaching.

REGRAS

1. Criar pelo menos 15 perguntas para cada caminho.

2. As perguntas devem ser:

- simples;
- humanas;
- observacionais;
- realistas;
- calmas;
- sem positividade tóxica;
- sem tom de coach;
- sem frases motivacionais.

Evitar perguntas como:

❌ "Como você vai conquistar seus sonhos?"
❌ "O que te aproxima da sua melhor versão?"
❌ "Como você pode ser mais extraordinário amanhã?"

3. O sistema deve escolher uma pergunta aleatória dentro da categoria ativa.

4. Não repetir a mesma pergunta em dias consecutivos.

5. Tentar não repetir perguntas já usadas recentemente.

Sugestão:
manter histórico das últimas 7 perguntas exibidas e evitar reutilização.

6. A pergunta exibida deve ser salva junto com o registro daquele dia.

Isso é importante porque:

- o usuário pode abrir o Diário semanas depois;
- precisa ver exatamente a pergunta que respondeu naquele dia;
- não pode recalcular uma nova pergunta ao abrir registros antigos.

EXEMPLOS

=========================
FOCO E DISCIPLINA
=========================

- O que mais disputou sua atenção hoje?
- Em que momento você percebeu que estava dispersa?
- O que realmente merecia seu foco hoje?
- O que você deixou para depois sem necessidade?
- Qual tarefa ficou mais leve quando você começou?
- O que interrompeu seu ritmo hoje?
- Qual distração apareceu mais vezes?
- O que ajudou você a continuar mesmo sem vontade?
- Em que momento você esteve mais presente?
- O que ocupou espaço demais na sua mente?
- O que você terminou que estava adiando?
- O que ficou mais claro quando você simplificou?
- O que vale a pena continuar amanhã?
- O que consumiu energia sem trazer resultado?
- Onde sua atenção fez diferença hoje?

=========================
CALMA E CLAREZA MENTAL
=========================

- O que trouxe um pouco de silêncio para o seu dia?
- Em que momento você conseguiu desacelerar?
- O que parecia urgente mas não era?
- O que ficou mais leve depois de uma pausa?
- O que sua mente precisava ouvir hoje?
- O que você deixou de carregar por alguns minutos?
- O que ajudou você a respirar melhor?
- Quando você se sentiu mais presente?
- O que estava fazendo mais barulho dentro de você?
- O que ficou mais claro ao longo do dia?
- Que pensamento perdeu força hoje?
- O que merece menos espaço na sua cabeça?
- O que ajudou você a voltar para si?
- Onde você encontrou tranquilidade?
- O que pode esperar até amanhã?

=========================
AUTOCONFIANÇA
=========================

- O que você fez mesmo com alguma insegurança?
- Qual pequena decisão foi sua hoje?
- O que mostrou que você continua tentando?
- Em que momento você confiou mais em si?
- O que você enfrentou sem ter todas as respostas?
- Qual atitude merece reconhecimento?
- O que você fez por você hoje?
- Onde você percebeu alguma evolução?
- O que exigiu coragem silenciosa?
- Qual escolha respeitou seus limites?
- O que você faria novamente?
- Em que momento você se ouviu mais?
- O que mostrou que você está aprendendo?
- Qual pequeno avanço passou despercebido?
- O que você conseguiu sustentar hoje?

=========================
RECUPERAÇÃO DO BURNOUT
=========================

- O que mais drenou sua energia hoje?
- O que seu corpo tentou comunicar?
- Quando você percebeu que precisava de uma pausa?
- O que pareceu pesado demais?
- O que consumiu mais energia do que deveria?
- O que você gostaria de ter feito mais devagar?
- O que ajudou você a recuperar um pouco de energia?
- Em que momento você se sentiu sobrecarregada?
- O que poderia esperar até amanhã?
- O que você carregou sozinha hoje?
- O que trouxe algum alívio?
- Onde você forçou além do necessário?
- O que seu corpo agradeceria agora?
- O que merece menos cobrança?
- O que ajudaria você a terminar o dia com mais gentileza?

IMPORTANTE

A pergunta sorteada deve:

- aparecer no card "Seu espaço particular";
- ser salva junto ao registro do dia;
- reaparecer exatamente igual no Diário;
- respeitar o caminho de recuperação ativo;
- mudar naturalmente ao longo dos dias sem parecer gerada por IA.