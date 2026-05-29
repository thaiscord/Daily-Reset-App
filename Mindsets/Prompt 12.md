ADIÇÃO AO SISTEMA "SEU ESPAÇO PARTICULAR"

Complementar a implementação já realizada.

A funcionalidade já está correta em relação ao caminho de recuperação.

Agora adicionar suporte completo a i18n.

IMPORTANTE

As perguntas não podem existir apenas em português.

Para cada pergunta existente nas categorias:

- Foco e Disciplina
- Calma e Clareza Mental
- Autoconfiança
- Recuperação do Burnout

Criar versões nativas em:

- Português
- Inglês
- Espanhol
- Francês
- Alemão

Não utilizar tradução literal.
Cada idioma deve soar como texto originalmente escrito naquele idioma.

As perguntas devem ser armazenadas no sistema i18n e não hardcoded.

O sorteio deve acontecer através das keys de tradução.

Exemplo:

progress.privateSpace.focusDiscipline.question1
progress.privateSpace.focusDiscipline.question2
...

Ao trocar o idioma do aplicativo, a pergunta exibida deve mudar automaticamente para o idioma selecionado.

O mesmo vale para:

- título da seção
- placeholder
- histórico do Diário
- visualização de registros anteriores

IMPORTANTE

Não salvar a frase traduzida no registro.

Salvar apenas o identificador da pergunta.

Exemplo:

{
  "questionId": "progress.privateSpace.focusDiscipline.question7"
}

Ao abrir o Diário, recuperar a tradução usando o idioma ativo do aplicativo.

Isso garante que registros antigos continuem funcionando corretamente quando o usuário mudar de idioma futuramente.

Não alterar layout.
Não alterar design.
Não alterar comportamento existente.
Adicionar apenas a camada completa de internacionalização.