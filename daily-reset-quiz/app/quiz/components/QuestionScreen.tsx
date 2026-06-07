'use client'

import { useEffect, useRef, useState } from 'react'
import { QuizQuestion, QuizOption } from '../types'

interface QuestionScreenProps {
  question: QuizQuestion
  onAnswer: (option: QuizOption) => void
  currentStep: number
  totalSteps: number
}

export default function QuestionScreen({
  question,
  onAnswer,
  currentStep,
  totalSteps,
}: QuestionScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const hasSelection = selectedIndex !== null
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.width = `${progress}%`
    }
  }, [progress])

  function handleSelect(option: QuizOption, index: number) {
    if (hasSelection) return
    setSelectedIndex(index)
    setTimeout(() => onAnswer(option), 1200)
  }

  function cardClass(index: number): string {
    const base = 'w-full text-left p-4 rounded-2xl border transition-all duration-300'
    if (!hasSelection) {
      return `${base} bg-white border-[#F0EBE3] hover:border-[#E8D5A3] cursor-pointer`
    }
    if (selectedIndex === index) {
      return `${base} bg-[#E8D5A3] border-[#C9A84C] scale-[1.01]`
    }
    return `${base} opacity-0 translate-y-1.5 pointer-events-none`
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col px-6 py-8">
      <div className="w-full mb-8">
        <div className="h-0.5 bg-[#F0EBE3] rounded-full w-full overflow-hidden">
          <div ref={fillRef} className="progress-fill" />
        </div>
        <p className="text-[#6B6B6B] text-sm mt-3 text-center">
          {currentStep} de {totalSteps}
        </p>
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full">
        <h2 className="text-[#1A1A1A] text-2xl font-bold leading-snug mb-8">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option, index)}
              className={cardClass(index)}
            >
              <span className="text-[#1A1A1A] text-base leading-relaxed">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
