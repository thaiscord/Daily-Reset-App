'use client'

import { useEffect, useRef, useState } from 'react'

interface TransitionScreenProps {
  onComplete: () => void
}

const PHRASES = [
  'Organizando suas respostas…',
  'Encontrando o que mais apareceu…',
  'Conectando os sinais do seu perfil…',
  'Seu resultado está pronto.',
] as const

// Three-phase model guarantees no overlap and correct transform origin per direction:
//   hidden   → opacity:0  translateY(+4px)  NO transition  (instant reset)
//   exiting  → opacity:0  translateY(-4px)  450ms           (drifts upward out)
//   visible  → opacity:1  translateY(  0 )  500ms           (rises into place)
type Phase = 'hidden' | 'exiting' | 'visible'

export default function TransitionScreen({ onComplete }: TransitionScreenProps) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phase,       setPhase]       = useState<Phase>('hidden')
  const [isRevealing, setIsRevealing] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => { onCompleteRef.current = onComplete })

  useEffect(() => {
    // Per-transition timing:
    //   T + 0ms:   exiting   → 450ms fade-out, moves to translateY(-4px)
    //   T + 630ms: hidden    → instant jump back to translateY(+4px), text swaps
    //   T + 650ms: visible   → 500ms fade-in, rises to translateY(0)
    //
    // The 20ms flush between hidden and visible lets the browser commit the
    // reset render before the entering animation begins — no jank, no snap.
    const FADE_OUT = 450
    const GAP      = 180
    const FLUSH    =  20

    // Bring up phrase 0
    const tInit = setTimeout(() => setPhase('visible'), 16)

    function scheduleTransition(startMs: number, toIdx: number) {
      const t: ReturnType<typeof setTimeout>[] = []
      t.push(setTimeout(() => setPhase('exiting'), startMs))
      t.push(setTimeout(() => {
        setPhraseIndex(toIdx)
        setPhase('hidden')
      }, startMs + FADE_OUT + GAP))
      t.push(setTimeout(() => setPhase('visible'), startMs + FADE_OUT + GAP + FLUSH))
      return t
    }

    const tr1 = scheduleTransition(2000, 1)   // phrase 0 → 1
    const tr2 = scheduleTransition(4500, 2)   // phrase 1 → 2
    const tr3 = scheduleTransition(7000, 3)   // phrase 2 → 3

    // Revelation: last phrase stays on stage — whole screen fades together
    const t10 = setTimeout(() => setIsRevealing(true),  9500)
    const t11 = setTimeout(() => setIsFadingOut(true),  10500)
    const t12 = setTimeout(() => onCompleteRef.current(), 11500)

    return () => {
      clearTimeout(tInit)
      ;[...tr1, ...tr2, ...tr3, t10, t11, t12].forEach(clearTimeout)
    }
  }, [])

  const screenCls = [
    'transition-screen',
    isRevealing ? 'is-revealing' : '',
    isFadingOut ? 'is-fading-out' : '',
  ].filter(Boolean).join(' ')

  const phraseCls = [
    'transition-phrase',
    phase === 'exiting' ? 'is-exiting' : '',
    phase === 'visible' ? 'is-visible' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={screenCls}>

      {/* Faint dust particles scattered across the full background */}
      <div className="transition-bg-particles" aria-hidden="true">
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
        <span className="transition-bg-particle" />
      </div>

      <div className="transition-content">

        <div className="orb-wrapper">
          <div className="orb-ring orb-ring--outer" />
          <div className="orb-ring orb-ring--inner" />
          <div className="orb-aura" />
          <div className="orb-reveal-glow" />
          <div className="orb-sphere" />
          <div className="orb-particles">
            <span className="orb-particle" />
            <span className="orb-particle" />
            <span className="orb-particle" />
            <span className="orb-particle" />
            <span className="orb-particle" />
            <span className="orb-particle" />
          </div>
        </div>

        {/* Fixed-height container — orb never shifts when phrases change */}
        <div className="transition-phrase-container">
          <p className={phraseCls}>
            {PHRASES[phraseIndex]}
          </p>
        </div>

      </div>
    </div>
  )
}
