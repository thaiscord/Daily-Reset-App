DESATIVAR PAYWALL INTERNO E TRANSFORMAR TODO ACESSO EM PREMIUM

Contexto:
O app Daily Reset será vendido fora do app, por plataformas externas como Kiwify e CactoPay. Portanto, o app NÃO deve mais exibir paywall interno, tela de assinatura, bloqueios PRO ou lógica de compra dentro do aplicativo.

Objetivo:
Manter exatamente a estrutura, layout, design e navegação atuais, mas fazer o app funcionar como se todo usuário já tivesse acesso premium liberado.

NÃO mudar:
- layout das telas;
- identidade visual;
- estrutura das abas;
- design dos cards;
- fluxo principal do app;
- conteúdo existente;
- navegação principal.

FAZER:

1. Desativar completamente o paywall
- Remover qualquer abertura automática da tela de paywall.
- Remover qualquer navegação para paywall ao tocar em conteúdo bloqueado.
- Remover popups, modais ou banners de assinatura.
- Remover CTAs como:
  - “Acessar experiência completa”
  - “Unlock full experience”
  - “Começar semana gratuita”
  - “Plano anual”
  - “Plano mensal”
  - qualquer texto de trial, assinatura ou compra.

2. Forçar acesso premium por padrão
- Criar ou ajustar a lógica global para que o app considere sempre:
  isPremium = true
  hasPremiumAccess = true
  subscriptionActive = true
- Qualquer função que valide assinatura deve retornar acesso liberado.
- Não depender de RevenueCat, StoreKit, Stripe, paywall screen ou purchase state para liberar conteúdo.

3. Remover bloqueios visuais PRO
- Remover cadeado.
- Remover label “PRO”.
- Remover blur/opacidade de conteúdo bloqueado.
- Remover estado disabled dos cards premium.
- Todos os mindsets, categorias, rituais, reflexões, progresso e recursos devem abrir normalmente.

4. Corrigir a aba Mindset
- Cards antes bloqueados por PRO devem aparecer como cards normais.
- Se algum conteúdo ainda for liberado por dias, manter apenas a lógica de progressão por dia, se ela fizer sentido.
- Mas nada deve abrir paywall.
- Nada deve mostrar “PRO”.

5. Corrigir a aba You / Perfil
- Remover botão de assinatura/paywall.
- Remover “Acessar experiência completa”.
- Remover “Restaurar compra”, se não fizer mais sentido.
- Caso precise manter um item informativo, trocar por algo neutro como:
  “Acesso liberado”
  subtítulo: “Sua experiência Daily Reset está ativa.”
- Não deixar espaço vazio ou visual estranho.

6. Corrigir configurações
- Remover ou ocultar opções relacionadas a compra interna:
  - Restaurar compra
  - Gerenciar assinatura
  - Plano anual
  - Plano mensal
  - Free trial
- Manter idioma, notificações, privacidade, termos, apagar dados e demais configurações úteis.

7. Corrigir textos e estados vazios
- Procurar no projeto inteiro por:
  paywall
  premium
  pro
  unlock
  subscription
  trial
  purchase
  restore
  locked
  isPremium
  hasPremiumAccess
- Garantir que nenhum texto de venda interna apareça no app.
- Garantir que nenhuma chave crua apareça na tela.

8. Manter compatibilidade futura
- Não deletar arquivos importantes se isso quebrar imports.
- Preferir desativar/ocultar o fluxo de paywall de forma segura.
- Se remover algum componente, remover também imports e rotas não usadas.
- O app precisa compilar sem erros.

9. Validação obrigatória
Testar:
- usuário novo;
- usuário com app resetado;
- aba Today;
- ritual de reset;
- aba Mindset;
- cards antes bloqueados;
- aba Progress;
- aba You;
- configurações;
- idiomas PT, EN, ES, FR e DE.

Critérios finais:
- Nenhum paywall aparece.
- Nenhum card abre paywall.
- Nenhum conteúdo aparece bloqueado por PRO.
- Nenhum botão de assinatura aparece.
- Nenhum cadeado PRO aparece.
- O app inteiro funciona como acesso premium liberado.
- Layout permanece praticamente igual, apenas sem bloqueios e sem elementos de compra interna.