CORRIGIR SISTEMA DE NOTIFICAÇÕES DO DAILY RESET

As notificações pararam de chegar. Corrija o sistema completo de notificações para que ele respeite exatamente as configurações do usuário.

Objetivo:
As notificações devem ser agendadas, canceladas e reagendadas corretamente conforme os toggles e horários definidos nas configurações.

REGRAS PRINCIPAIS:

1. Verificar permissão de notificação
- Ao ativar qualquer notificação, verificar se a permissão existe.
- Se não existir, solicitar permissão.
- Se o usuário negar, não tentar agendar silenciosamente.
- Mostrar estado correto nas configurações.

2. Reagendar notificações sempre que:
- o app abrir;
- o usuário mudar idioma;
- o usuário mudar horário;
- o usuário ativar/desativar algum toggle;
- o usuário concluir o reset do dia;
- o usuário resetar dados do app.

3. Respeitar cada toggle individualmente
Se estiver ATIVADO, agendar.
Se estiver DESATIVADO, cancelar.

Tipos:
- check-in da noite;
- palavra do dia;
- momentos de marco;
- lembrete diário principal;
- notificações de retorno após inatividade, se existirem.

4. Check-in da noite
- Só deve aparecer se o toggle de check-in da noite estiver ativo.
- Deve usar exatamente o horário escolhido pelo usuário.
- Se estiver desativado, cancelar qualquer notificação antiga desse tipo.

5. Palavra do dia
- Só deve aparecer se o toggle da palavra do dia estiver ativo.
- Deve usar o horário definido.
- Se estiver desativado, cancelar qualquer notificação antiga desse tipo.

6. Momentos de marco
- Só devem aparecer se o toggle de marcos estiver ativo.
- Agendar apenas quando houver marco real próximo ou atingido.
- Exemplos: Dia 3, Dia 7, Dia 14, Dia 30 etc.
- Se estiver desativado, cancelar qualquer notificação antiga desse tipo.

7. Evitar duplicação
Antes de reagendar:
- cancelar notificações pendentes antigas do Daily Reset;
- ou cancelar por identificador/categoria específica;
- depois recriar somente as notificações permitidas pelos toggles ativos.

8. Identificadores fixos
Criar IDs claros para cada tipo:
- daily_reset_reminder
- night_checkin
- word_of_day
- milestone_day_3
- milestone_day_7
- milestone_day_14
- milestone_day_30
- inactivity_day_2
- inactivity_day_3

Não usar IDs aleatórios que impedem cancelamento correto.

9. Horário passado no dia atual
Se o horário escolhido para hoje já passou:
- agendar para amanhã.
Se ainda não passou:
- agendar para hoje.

10. Timezone/local time
Usar sempre horário local do dispositivo.
Não usar UTC de forma que mude o horário real da notificação.

11. Idioma
A notificação deve sair no idioma atualmente selecionado:
- PT
- EN
- ES
- FR
- DE

Se a pessoa trocar idioma, cancelar e reagendar tudo no novo idioma.

12. Conteúdo
Manter frases humanas, neutras, não coach, não culpabilizantes.
Nunca usar linguagem feminina específica.
Evitar:
- “você precisa”
- “não desista”
- “vença”
- “seja forte”
- tom de cobrança.

Preferir:
- “Um momento pequeno já conta.”
- “Você pode voltar com calma.”
- “Sem pressão. Só um retorno.”
- “Ainda dá para fazer pequeno.”

13. Debug obrigatório
Adicionar logs temporários no console:
- permissão atual;
- toggles ativos;
- horários escolhidos;
- notificações canceladas;
- notificações agendadas;
- lista final de notificações pendentes.

Exemplo:
console.log('[notifications] scheduled:', scheduledNotifications)

14. Teste obrigatório
Após corrigir, testar:
- ativar check-in da noite → deve agendar;
- desativar check-in da noite → deve cancelar;
- ativar palavra do dia → deve agendar;
- desativar palavra do dia → deve cancelar;
- ativar marcos → deve agendar quando fizer sentido;
- desativar marcos → deve cancelar;
- trocar horário → deve reagendar no novo horário;
- trocar idioma → deve reagendar no novo idioma;
- fechar e abrir app → notificações continuam pendentes.

Resultado esperado:
As notificações voltam a funcionar normalmente, respeitando exatamente as configurações do usuário. Nenhuma notificação deve ser enviada se o toggle estiver desligado. Nenhuma notificação configurada como ativa deve deixar de ser agendada.