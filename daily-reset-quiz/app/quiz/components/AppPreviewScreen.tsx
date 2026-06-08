'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Variation } from '../types'

import pressureImg1    from '../../../Assets/Results/pressure-1min.png.jpeg'
import pressureImg2    from '../../../Assets/Results/pressure-2min.png.jpeg'
import pressureImg5    from '../../../Assets/Results/pressure-5min.png.jpeg'
import exhaustionImg1  from '../../../Assets/Results/exhaustion-1min.png.jpeg'
import exhaustionImg2  from '../../../Assets/Results/exhaustion-2min.png.jpeg'
import exhaustionImg5  from '../../../Assets/Results/exhaustion-5min.png.jpeg'
import disconnectionImg1 from '../../../Assets/Results/disconnection-1min.png.jpeg'
import disconnectionImg2 from '../../../Assets/Results/disconnection-2min.png.jpeg'
import disconnectionImg5 from '../../../Assets/Results/disconnection-5min.png.png'

interface AppPreviewScreenProps { variation: Variation }

const SIGNUP_URL = 'https://pay.cakto.com.br/7ujagvn_918698'

const cardImages: Record<Variation, [StaticImageData, StaticImageData, StaticImageData]> = {
  A: [pressureImg1,    pressureImg2,    pressureImg5],
  B: [exhaustionImg1,  exhaustionImg2,  exhaustionImg5],
  C: [disconnectionImg1, disconnectionImg2, disconnectionImg5],
}

const introLines: Record<Variation, string[]> = {
  A: [
    'O Daily Reset foi pensado para isso — não para resolver tudo, mas para criar alguns minutos seus nos dias que mais pesam.',
    'São poucos minutos. Mas são seus.',
  ],
  B: [
    'O que apareceu nas suas respostas não parece falta de disciplina.',
    'Parece mais alguém que continua seguindo em frente sem conseguir recuperar de verdade a energia que está gastando.',
    'Foi pensando em pessoas que continuam seguindo em frente mesmo cansadas que o Daily Reset foi criado.',
  ],
  C: [
    'O que você descreveu não parece falta de força de vontade.',
    'Parece que você passou tanto tempo funcionando no automático que começou a perder contato com o que sente.',
    'E é justamente para momentos assim que o Daily Reset existe.',
    'Não para trazer respostas.',
    'Mas para criar alguns minutos em que você possa voltar a se escutar.',
  ],
}

const cardSubtitles: Record<Variation, [string, string, string]> = {
  A: ['Respirar antes de resolver mais uma coisa.',   'Existir por alguns minutos sem precisar resolver nada.',   'Sair do modo de resolver por alguns minutos.'],
  B: ['Parar de empurrar o corpo por mais um minuto.',  'Descansar sem precisar merecer isso.',              'Ouvir o que o cansaço está tentando dizer.'],
  C: ['Sair do automático por um instante.',         'Ouvir o que você não tem parado para ouvir.',      'Voltar a sentir que viveu o dia, não apenas cumpriu.'],
}

const preCTALines: Record<Variation, string> = {
  A: 'Se hoje pareceu que não havia espaço para parar, talvez esse seja um bom lugar para começar.',
  B: 'Se você está cansado de continuar sem conseguir se recuperar, talvez seja hora de tentar algo diferente.',
  C: 'Se você sente falta de se sentir presente, esse pode ser um primeiro passo de volta.',
}

const firstDaysText: Record<Variation, string[]> = {
  A: [
    'Nos primeiros dias, parar pode parecer estranho.',
    'É normal.',
    'Quem continua costuma perceber, em algum momento da primeira semana, que chegou ao dia de um jeito diferente.',
  ],
  B: [
    'Não muda tudo de uma vez.',
    'Mas muitas pessoas começam a perceber, durante a primeira semana, que estão carregando um pouco menos do que antes.',
  ],
  C: [
    'Normalmente não é a energia.',
    'Não é a motivação.',
    'Nem a vontade de fazer grandes mudanças.',
    'O que costuma voltar primeiro é algo menor:',
    'a sensação de estar realmente dentro do próprio dia.',
  ],
}

const firstDaysTitles: Record<Variation, string> = {
  A: 'O que costuma acontecer nos primeiros dias',
  B: 'O que costuma acontecer nos primeiros dias',
  C: 'O que costuma mudar primeiro',
}

const firstDaysClosing: Record<Variation, string[]> = {
  A: [],
  B: [],
  C: [
    'Às vezes por um minuto.',
    'Às vezes por cinco.',
    'Mas já é diferente de apenas passar por ele.',
  ],
}

const headlines: Record<Variation, string> = {
  A: 'Você já carregou coisa demais hoje.',
  B: 'Você não precisa merecer o descanso.',
  C: 'Você esteve presente para todo mundo. Menos para você.',
}

const finalCTA: Record<Variation, string> = {
  A: 'Criar meu espaço para parar →',
  B: 'Quero começar a descansar →',
  C: 'Quero voltar a me escutar →',
}

const cardTimes = ['1 minuto', '2 minutos', '5 minutos'] as const

// Strings estáticas — Tailwind JIT precisa enxergar os valores literais
const cardCropClasses = [
  'object-cover [object-position:50%_50%]',
  'object-cover [object-position:50%_20%]',
  'object-cover [object-position:50%_15%]',
] as const

const clockIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

// ── Helpers ─────────────────────────────────────────────────────────────────
function getTouchDist(t: React.TouchList) {
  return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AppPreviewScreen({ variation }: AppPreviewScreenProps) {
  const headline    = headlines[variation]
  const intro       = introLines[variation]
  const subtitles   = cardSubtitles[variation]
  const images      = cardImages[variation]
  const preCTA      = preCTALines[variation]
  const firstDays   = firstDaysText[variation]
  const firstDaysTitle = firstDaysTitles[variation]
  const firstDaysClose = firstDaysClosing[variation]

  // ── Lightbox React state (open/close lifecycle + animation) ─────────────
  const [lbOpen,    setLbOpen]    = useState(false)
  const [lbVisible, setLbVisible] = useState(false)
  const [lbImage,   setLbImage]   = useState<StaticImageData | null>(null)
  const [lbAlt,     setLbAlt]     = useState('')
  const scrollYRef = useRef(0)

  // ── DOM refs for 60fps gesture manipulation ──────────────────────────────
  const overlayRef  = useRef<HTMLDivElement>(null)   // backdrop
  const imgWrapRef  = useRef<HTMLDivElement>(null)   // pinch-zoom + swipe container

  // ── Gesture state (all in refs — zero re-renders per frame) ─────────────
  const zoomRef  = useRef(1)
  const panRef   = useRef({ x: 0, y: 0 })
  const swipeRef = useRef({ active: false, startY: 0, dy: 0 })
  const gestureRef = useRef<'idle' | 'pinch' | 'pan' | 'swipe-down'>('idle')
  const pinchRef = useRef({ startDist: 0, startZoom: 1 })
  const panStartRef = useRef({ lastX: 0, lastY: 0 })

  // Scroll lock
  useEffect(() => {
    if (!lbOpen) return
    scrollYRef.current = window.scrollY
    document.body.style.position  = 'fixed'
    document.body.style.top       = `-${scrollYRef.current}px`
    document.body.style.width     = '100%'
    document.body.style.overflowY = 'scroll'
    return () => {
      document.body.style.cssText = ''
      window.scrollTo(0, scrollYRef.current)
    }
  }, [lbOpen])

  // ── Transform helpers ────────────────────────────────────────────────────
  function applyImageTransform() {
    const el = imgWrapRef.current
    if (!el) return
    const z  = zoomRef.current
    const p  = panRef.current
    const sy = swipeRef.current.dy

    if (z > 1) {
      el.style.transform = `scale(${z}) translate(${p.x / z}px, ${p.y / z}px)`
    } else if (sy > 0) {
      const shrink = Math.max(0.88, 1 - sy / 600)
      el.style.transform = `translateY(${sy}px) scale(${shrink})`
    } else {
      el.style.transform = ''
    }
  }

  function applyOverlayOpacity(opacity: number) {
    if (overlayRef.current) overlayRef.current.style.opacity = String(opacity)
  }

  function clearOverlayOpacity() {
    if (overlayRef.current) overlayRef.current.style.opacity = ''
  }

  function resetGesture() {
    zoomRef.current = 1
    panRef.current  = { x: 0, y: 0 }
    swipeRef.current = { active: false, startY: 0, dy: 0 }
    gestureRef.current = 'idle'
    applyImageTransform()
    clearOverlayOpacity()
  }

  // ── Lightbox open / close ────────────────────────────────────────────────
  function openLb(img: StaticImageData, alt: string) {
    resetGesture()
    setLbImage(img)
    setLbAlt(alt)
    setLbOpen(true)
    setTimeout(() => setLbVisible(true), 10)
  }

  function closeLb() {
    resetGesture()
    setLbVisible(false)
    setTimeout(() => { setLbOpen(false); setLbImage(null) }, 220)
  }

  /** Slide image out + fade overlay, then unmount */
  function dismissWithSwipe() {
    const el = imgWrapRef.current
    if (el) {
      el.style.transition = 'transform 0.22s ease-out'
      el.style.transform  = `translateY(110vh) scale(0.9)`
    }
    applyOverlayOpacity(0)
    if (overlayRef.current) overlayRef.current.style.transition = 'opacity 0.22s ease-out'
    setTimeout(() => {
      if (el)               { el.style.transition = ''; el.style.transform = '' }
      if (overlayRef.current) { overlayRef.current.style.transition = ''; overlayRef.current.style.opacity = '' }
      swipeRef.current.dy = 0
      setLbOpen(false)
      setLbImage(null)
    }, 230)
  }

  // ── Touch handlers ────────────────────────────────────────────────────────
  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      gestureRef.current = 'pinch'
      pinchRef.current   = { startDist: getTouchDist(e.touches), startZoom: zoomRef.current }
    } else if (e.touches.length === 1) {
      const t = e.touches[0]
      if (zoomRef.current > 1) {
        gestureRef.current    = 'pan'
        panStartRef.current   = { lastX: t.clientX, lastY: t.clientY }
      } else {
        gestureRef.current    = 'swipe-down'
        swipeRef.current      = { active: true, startY: t.clientY, dy: 0 }
      }
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault()
    const mode = gestureRef.current

    if (mode === 'pinch' && e.touches.length === 2) {
      const ratio       = getTouchDist(e.touches) / pinchRef.current.startDist
      zoomRef.current   = Math.min(Math.max(pinchRef.current.startZoom * ratio, 1), 6)
      applyImageTransform()

    } else if (mode === 'pan' && e.touches.length === 1) {
      const t = e.touches[0]
      panRef.current = {
        x: panRef.current.x + (t.clientX - panStartRef.current.lastX),
        y: panRef.current.y + (t.clientY - panStartRef.current.lastY),
      }
      panStartRef.current = { lastX: t.clientX, lastY: t.clientY }
      applyImageTransform()

    } else if (mode === 'swipe-down' && e.touches.length === 1) {
      const dy = e.touches[0].clientY - swipeRef.current.startY
      if (dy > 0) {
        swipeRef.current.dy = dy
        applyImageTransform()
        // Fade backdrop proportionally
        applyOverlayOpacity(Math.max(0.05, 0.92 - dy / 350))
      }
    }
  }

  function onTouchEnd() {
    const mode = gestureRef.current

    if (mode === 'swipe-down') {
      if (swipeRef.current.dy > 90) {
        dismissWithSwipe()
      } else {
        // Snap back with spring
        const el = imgWrapRef.current
        if (el) {
          el.style.transition = 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)'
          el.style.transform  = ''
          setTimeout(() => { if (el) el.style.transition = '' }, 260)
        }
        swipeRef.current.dy = 0
        clearOverlayOpacity()
      }
    } else if (mode === 'pinch' && zoomRef.current < 1.05) {
      resetGesture()
    }

    gestureRef.current = 'idle'
  }

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-12">
      <div className="max-w-lg mx-auto flex flex-col gap-8">

        <h2 className="text-[#1A1A1A] text-2xl font-bold text-center leading-snug">
          {headline}
        </h2>

        <p className="text-[#6B6B6B] text-base text-center leading-relaxed">
          Às vezes o que ajuda não é grande. É só ter um lugar para ir.
        </p>

        <div className="flex flex-col gap-3">
          {intro.slice(0, -1).map((line, i) => (
            <p key={i} className="text-[#1A1A1A] text-base leading-relaxed text-center">{line}</p>
          ))}
          <p className="text-[#6B6B6B] italic text-base leading-relaxed text-center">{intro[intro.length - 1]}</p>
        </div>

        {/* ── Ritual diário ──────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1 text-center">
          <p className="text-[#6B6B6B] text-sm leading-relaxed">
            Cada dia, você escolhe quanto tempo tem.
          </p>
          <p className="text-[#8A8A8A] text-sm italic leading-relaxed">
            Um minuto ou cinco — o que importa é que é seu.
          </p>
        </div>

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {cardTimes.map((time, i) => (
            <div key={i} className="bg-white border border-[#F0EBE3] rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                {i === 0 && <div className="mb-0.5">{clockIcon}</div>}
                <p className="text-[#1A1A1A] font-bold text-lg">{time}</p>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{subtitles[i]}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  aria-label={`Ampliar demonstração: ${time}`}
                  onClick={() => openLb(images[i], `Daily Reset — ${time}`)}
                  className="relative overflow-hidden rounded-[28px] w-[52%] aspect-[9/16] shadow-[0_8px_32px_rgba(0,0,0,0.13)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none cursor-pointer"
                >
                  <Image
                    src={images[i]}
                    alt={`Daily Reset — ${time}`}
                    fill
                    sizes="(max-width: 768px) 55vw, 280px"
                    className={cardCropClasses[i]}
                    onError={() => console.error(`[AppPreviewScreen] Imagem ausente: perfil ${variation}, card ${i + 1} (${time})`)}
                  />
                  <span className="absolute bottom-2.5 right-2.5 bg-black/25 rounded-full p-1 opacity-70 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M7.5 1.5H10.5V4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.5 10.5H1.5V7.5"  stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.5 1.5L7 5"      stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M1.5 10.5L5 7"      stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <p className="text-[#8A8A8A] text-xs tracking-wide">Toque para ampliar</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Primeiros dias ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 pt-2 border-t border-[#F0EBE3]">
          <p className="text-[#8A8A8A] text-sm text-center font-medium">
            {firstDaysTitle}
          </p>
          <div className="flex flex-col gap-3">
            {firstDays.map((paragraph, i) => (
              <p key={i} className="text-[#1A1A1A] text-base leading-relaxed text-center">
                {paragraph}
              </p>
            ))}
          </div>
          {firstDaysClose.length > 0 && (
            <div className="flex flex-col gap-2 mt-1">
              {firstDaysClose.map((line, i) => (
                <p key={i} className="text-[#6B6B6B] text-sm italic text-center leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* ── Transição pré-CTA ──────────────────────────────────────────── */}
        <p className="text-[#6B6B6B] text-sm text-center leading-relaxed italic">
          {preCTA}
        </p>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center pb-8">
          <a
            href={SIGNUP_URL}
            className="bg-[#C9A84C] text-white font-semibold text-base px-8 py-4 rounded-full w-full max-w-[400px] text-center hover:bg-[#b8953d] transition-colors duration-200"
          >
            {finalCTA[variation]}
          </a>
        </div>

      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lbOpen && lbImage && (
        <div
          ref={overlayRef}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/[0.92] backdrop-blur-sm transition-opacity duration-200 ${
            lbVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeLb}
        >
          {/* Voltar */}
          <button
            type="button"
            onClick={closeLb}
            className="absolute top-5 left-4 z-20 flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors duration-150"
          >
            <span aria-hidden>←</span><span>Voltar</span>
          </button>

          {/* Fechar (X) */}
          <button
            type="button"
            onClick={closeLb}
            aria-label="Fechar"
            className="absolute top-5 right-4 z-20 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center text-xl leading-none transition-colors duration-150"
          >
            ×
          </button>

          {/* Dica de gesto */}
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/40 text-xs pointer-events-none">
            Arraste para baixo para fechar
          </p>

          {/* Container de abertura (scale) → não propaga click */}
          <div
            className={`transition-transform duration-200 ${lbVisible ? 'scale-100' : 'scale-95'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Container de gestos (refs, DOM direto) */}
            <div
              ref={imgWrapRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lbImage.src}
                alt={lbAlt}
                className="max-h-[92dvh] max-w-[96vw] w-auto h-auto select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
