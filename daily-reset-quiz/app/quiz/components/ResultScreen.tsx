'use client'

import { Variation, Tag } from '../types'

interface ResultScreenProps {
  variation: Variation
  tag: Tag
  onNext: () => void
}

// ─── VARIAÇÃO A — Pressão / Sobrecarga ────────────────────────────────────────
//
// Voz: observadora, acolhedora, sem diagnósticos. Parte das escolhas feitas
// pela pessoa e mostra padrões. Nunca conclui o que a pessoa sente.
//
// ─── VARIAÇÕES B e C — mantidas como estavam ─────────────────────────────────

const bridgeText: Record<Variation, string> = {
  A: 'Lendo suas respostas, ficou a imagem de alguém que carrega muita coisa — e raramente consegue parar para perceber isso.',
  B: 'Lendo suas respostas, ficou a imagem de alguém que não parou de funcionar — mas que faz um tempo não consegue se recuperar de verdade.',
  C: 'Lendo suas respostas, ficou a sensação de alguém que está presente para todo mundo — mas um pouco menos para si mesmo.',
}

const headline: Record<Variation, string> = {
  A: 'Você resolve tudo. Menos o cansaço que acumula.',
  B: 'O descanso acontece. A recuperação, não.',
  C: 'Você está aqui. Mas não inteiramente.',
}

// Linha de abertura logo abaixo do headline — variação A tem nova voz
const subtitleText: Record<Variation, string> = {
  A: 'E provavelmente não foi de uma hora para outra.',
  B: 'Você está cumprindo tudo. Mas nada está recarregando.',
  C: 'E talvez nem tenha percebido quando isso começou.',
}

const reframe: Record<Variation, string> = {
  A: 'Quando a pressão vira rotina, ela deixa de chamar atenção. Mas não deixa de ocupar espaço.',
  B: 'Você até tem momentos de pausa. Mas o cansaço parece não receber o recado.',
  C: 'Quando o distanciamento vira rotina, ele deixa de parecer distanciamento. Vira só o jeito que as coisas são.',
}

const essentialParagraphs: Record<Variation, string[]> = {
  A: [
    'Talvez o mais cansativo não seja uma única coisa. Talvez seja nunca conseguir sair completamente do modo de resolver.',
    'Esse tipo de cansaço raramente avisa com clareza. Ele aparece quando parar por cinco minutos começa a parecer impossível.',
  ],
  B: [
    'Você dorme. Às vezes até bastante. Mas acorda igual.',
    'Tem coisas que antes te davam alguma coisa. Agora só custam.',
  ],
  C: [
    'Você continua aparecendo para tudo.',
    'Mas nem sempre parece estar realmente lá.',
    'Algumas coisas ainda acontecem.',
    'Mas já não chegam até você do mesmo jeito.',
    'E talvez seja justamente por isso que passou despercebido.',
    'Porque nada parece errado.',
    'Só parece distante.',
  ],
}

const extendedParagraphs: Record<Variation, string[]> = {
  A: [
    'Nem sempre é fácil apontar uma coisa só. Às vezes o peso vem do acúmulo.',
    'Você provavelmente não precisa de mais uma coisa para fazer. A ideia é criar um pequeno momento para respirar.',
  ],
  B: [
    'Descansar mais ajuda às vezes. Mas a sensação acaba voltando quase do mesmo jeito.',
    'Quem convive com você provavelmente não percebe.',
  ],
  C: [
    'Esse tipo de afastamento é mais difícil de nomear do que o cansaço físico. E justamente por isso acaba sendo mais fácil de deixar pra lá.',
    'Talvez você tenha se acostumado tanto com isso que nem percebe mais o quanto sente falta de estar presente.',
  ],
}

const ctaText: Record<Variation, string> = {
  A: 'Quero sair do modo de resolver →',
  B: 'Quero sentir que descansei →',
  C: 'Quero me sentir presente de novo →',
}

// Nota de contexto abaixo dos parágrafos estendidos, específica por variação
const contextNote: Record<Variation, string | null> = {
  A: 'Lendo tudo isso junto, não parece uma questão de esforço.',
  B: 'Talvez você tenha se acostumado a sentir isso.',
  C: 'Com o tempo, isso começa a parecer normal.',
}

const transitionText: Record<Variation, string> = {
  A: 'Se alguma parte desse texto pareceu familiar, talvez você esteja carregando mais do que percebe.',
  B: 'Se isso parece descrever sua rotina, talvez o cansaço esteja ocupando mais espaço do que deveria.',
  C: 'Se você se reconheceu nessas palavras, talvez esteja sentindo falta de si mesmo há mais tempo do que imaginava.',
}

const tagText: Record<Tag, string> = {
  tentou: 'Se você já tentou outras coisas e não conseguiu continuar, isso não diz muita coisa sobre você. Às vezes a dificuldade não é começar. É encontrar espaço para continuar.',
  usa: 'Você já vem tentando lidar com isso. A ideia aqui não é substituir o que funciona para você — é adicionar algo pequeno que caiba na vida real.',
  nunca: 'Você não precisa entender tudo hoje. Só precisa criar espaço para voltar a ouvir a si mesmo.',
}

export default function ResultScreen({ variation, tag, onNext }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-12">
      <div className="max-w-lg mx-auto flex flex-col gap-8">

        {/* — PRIMEIRA DOBRA — */}

        <p className="text-[#8A8A8A] italic text-base text-center leading-relaxed">
          {bridgeText[variation]}
        </p>

        <div className="flex justify-center -mt-2">
          <span className="bg-[#C9A84C] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
            Seu perfil
          </span>
        </div>

        <h1 className="text-[#1A1A1A] text-3xl font-bold leading-tight text-center mt-3 mb-6">
          {headline[variation]}
        </h1>

        <p className="text-[#6B6B6B] italic text-base text-center leading-relaxed">
          {subtitleText[variation]}
        </p>

        <div className="bg-[#FEFAF2] border border-[#EDE0B8] rounded-2xl p-6">
          <p className="text-[#1A1A1A] italic text-base leading-relaxed">
            {reframe[variation]}
          </p>
        </div>

        <div className="flex flex-col items-center mt-3">
          <button
            type="button"
            onClick={onNext}
            className="bg-[#C9A84C] text-white font-semibold text-base px-8 py-3.5 rounded-full w-full max-w-[400px] hover:bg-[#b8953d] transition-colors duration-200 cursor-pointer"
          >
            {ctaText[variation]}
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-3">
          {essentialParagraphs[variation].map((paragraph, i) => (
            <p key={i} className="text-[#1A1A1A] text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* — SEGUNDA DOBRA — */}

        {extendedParagraphs[variation].length > 0 && (
          <div className="flex flex-col gap-6 mt-3 pt-4 border-t border-[#F0EBE3]/50">
            {extendedParagraphs[variation].map((paragraph, i) => (
              <p key={i} className="text-[#1A1A1A] text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {contextNote[variation] && (
          <p className="text-[#555555] text-sm text-center font-medium">
            {contextNote[variation]}
          </p>
        )}

        <p className="text-[#555555] text-sm text-center">
          {transitionText[variation]}
        </p>

        <div className="bg-[#EDE8DC] rounded-2xl p-5">
          <p className="text-[#505050] italic text-sm leading-relaxed">
            {tagText[tag]}
          </p>
        </div>

        <div className="flex flex-col items-center pb-8">
          <button
            type="button"
            onClick={onNext}
            className="bg-[#C9A84C] text-white font-semibold text-base px-8 py-3.5 rounded-full w-full max-w-[400px] hover:bg-[#b8953d] transition-colors duration-200 cursor-pointer"
          >
            {ctaText[variation]}
          </button>
        </div>

      </div>
    </div>
  )
}
