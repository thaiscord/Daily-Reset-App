import { QuizQuestion } from './types'

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Como você está chegando nessa semana?',
    options: [
      { text: 'Sob pressão — tem muita coisa pesando', scores: { P: 2 } },
      { text: 'Esgotado — sem energia para quase nada', scores: { V: 2 } },
      { text: 'Nublado — não sei bem o que estou sentindo', scores: { D: 2 } },
      { text: 'No limite — qualquer coisa a mais pesa', scores: { P: 1, V: 1 } },
      { text: 'Em equilíbrio — mas algo ainda está fora do lugar', scores: { D: 1 } },
    ],
  },
  {
    id: 2,
    text: 'Quando você tenta descansar, o que acontece?',
    options: [
      { text: 'A mente não desliga — fico pensando no que falta fazer', scores: { P: 2 } },
      { text: 'Consigo parar, mas acordo igual — o descanso não restaura', scores: { V: 2 } },
      { text: 'Fico no celular sem querer — não consigo realmente parar', scores: { D: 2 } },
      { text: 'Sinto culpa por estar parado', scores: { P: 1 } },
      { text: 'Raramente consigo parar de verdade', scores: { P: 1, V: 1 } },
    ],
  },
  {
    id: 3,
    text: 'O que mais te esgota no dia a dia?',
    options: [
      { text: 'Excesso de decisões e responsabilidades', scores: { P: 2 } },
      { text: 'Sensação de nunca terminar nada', scores: { P: 1, V: 1 } },
      { text: 'Falta de tempo ou espaço para mim', scores: { V: 2 } },
      { text: 'Não saber o que estou sentindo', scores: { D: 2 } },
      { text: 'Fazer coisas que não têm mais sentido pra mim', scores: { D: 1, V: 1 } },
    ],
  },
  {
    id: 4,
    text: 'O que você sente mais falta ultimamente?',
    options: [
      { text: 'Acordar sem já me sentir cansado', scores: { V: 2 } },
      { text: 'Ter tempo para ouvir a mim mesmo', scores: { P: 1, D: 1 } },
      { text: 'Me sentir animado com alguma coisa', scores: { V: 1, D: 1 } },
      { text: 'Saber para onde estou indo', scores: { D: 2 } },
      { text: 'Sentir que ainda sou eu', scores: { D: 2 } },
    ],
  },
  {
    id: 5,
    text: 'Quando você percebe que não está bem, o que costuma aparecer primeiro?',
    options: [
      { text: 'A cabeça não para — fico no modo de resolver mesmo quando não precisava', scores: { P: 2 } },
      { text: 'Começo a funcionar no automático — presente em tudo, ausente de mim', scores: { D: 2 } },
      { text: 'Minha energia vai caindo — começo bem e não aguento', scores: { V: 2 } },
      { text: 'Fico entre dias que aguento e dias que desabo', scores: { P: 1, V: 1 } },
      { text: 'O dia acontece, mas parece que só passei por ele', scores: { D: 1, V: 1 } },
    ],
  },
  {
    id: 6,
    text: 'O que você mais precisa agora — mesmo que pareça impossível ter?',
    options: [
      { text: 'Um lugar para soltar o que está pesado', scores: { V: 2 } },
      { text: 'Parar de sentir que estou sempre atrasado', scores: { P: 2 } },
      { text: 'Entender o que estou sentindo de verdade', scores: { D: 2 } },
      { text: 'Simplesmente respirar sem culpa', scores: { P: 1, V: 1 } },
      { text: 'Reencontrar algo que tinha antes e sumiu', scores: { D: 1 } },
    ],
  },
  {
    id: 7,
    text: 'Uma semana boa, pra você, seria...',
    options: [
      { text: 'Conseguir cumprir tudo sem me sentir destruído no final', scores: { P: 2 } },
      { text: 'Descansar de verdade — acordar sem aquele peso', scores: { V: 2 } },
      { text: 'Sentir que eu estava presente — não só existindo', scores: { D: 2 } },
      { text: 'Ter pelo menos um momento que foi só meu', scores: { V: 1, D: 1 } },
      { text: 'Não carregar tudo isso sozinho', scores: { P: 1, V: 1 } },
    ],
  },
]
