export type Variation = 'A' | 'B' | 'C'
export type Tag = 'tentou' | 'usa' | 'nunca'

export interface Scores {
  P: number
  V: number
  D: number
}

export interface QuizOption {
  text: string
  scores?: Partial<Scores>
  tag?: Tag
}

export interface QuizQuestion {
  id: number
  text: string
  isTagQuestion?: boolean
  options: QuizOption[]
}

export interface QuizState {
  currentStep: number
  scores: Scores
  tag: Tag | null
  variation: Variation | null
}
