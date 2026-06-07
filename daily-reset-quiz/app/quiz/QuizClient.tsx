'use client'

import { useState } from 'react'
import { QuizState, Variation, Scores, QuizOption } from './types'
import { questions } from './data'
import EntryScreen from './components/EntryScreen'
import QuestionScreen from './components/QuestionScreen'
import TransitionScreen from './components/TransitionScreen'
import ResultScreen from './components/ResultScreen'
import AppPreviewScreen from './components/AppPreviewScreen'

const TOTAL_QUESTIONS = 7

function computeVariation(scores: Scores): Variation {
  const { P, V, D } = scores
  if (P > V && P > D) return 'A'
  if (V > P && V > D) return 'B'
  if (D > P && D > V) return 'C'
  // Desempates explícitos — nenhum empate cai em C por omissão
  if (P === V && P > D) return 'A' // pressão e esgotamento iguais, D menor
  if (P === D && P > V) return 'A' // pressão e distanciamento iguais, V menor
  if (V === D && V > P) return 'B' // esgotamento e distanciamento iguais, P menor
  return 'C'                        // empate triplo P=V=D
}

export default function QuizClient() {
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    scores: { P: 0, V: 0, D: 0 },
    tag: null,
    variation: null,
  })

  function handleStart() {
    setState(prev => ({ ...prev, currentStep: 1 }))
  }

  function handleAnswer(option: QuizOption) {
    setState(prev => {
      const newScores = { ...prev.scores }
      if (option.scores) {
        newScores.P += option.scores.P ?? 0
        newScores.V += option.scores.V ?? 0
        newScores.D += option.scores.D ?? 0
      }
      const newTag = option.tag !== undefined ? option.tag : prev.tag
      const nextStep = prev.currentStep + 1
      const variation =
        nextStep === TOTAL_QUESTIONS + 1 ? computeVariation(newScores) : prev.variation

      return { currentStep: nextStep, scores: newScores, tag: newTag, variation }
    })
  }

  function handleTransitionComplete() {
    setState(prev => ({ ...prev, currentStep: TOTAL_QUESTIONS + 2 }))
  }

  function handleResultNext() {
    setState(prev => ({ ...prev, currentStep: TOTAL_QUESTIONS + 3 }))
  }

  const { currentStep, variation, tag } = state

  if (currentStep === 0) {
    return <EntryScreen onStart={handleStart} />
  }

  if (currentStep >= 1 && currentStep <= TOTAL_QUESTIONS) {
    const question = questions[currentStep - 1]
    return (
      <QuestionScreen
        key={question.id}
        question={question}
        onAnswer={handleAnswer}
        currentStep={currentStep}
        totalSteps={TOTAL_QUESTIONS}
      />
    )
  }

  if (currentStep === TOTAL_QUESTIONS + 1) {
    return <TransitionScreen onComplete={handleTransitionComplete} />
  }

  if (currentStep === TOTAL_QUESTIONS + 2 && variation) {
    return (
      <ResultScreen
        variation={variation}
        tag={tag ?? 'nunca'}
        onNext={handleResultNext}
      />
    )
  }

  if (currentStep === TOTAL_QUESTIONS + 3 && variation) {
    return <AppPreviewScreen variation={variation} />
  }

  return null
}
