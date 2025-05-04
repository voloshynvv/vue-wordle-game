export type CellStatus = 'correct' | 'misplaced' | 'absent'

export interface ValidatedLetter {
  status: CellStatus
  letter: string
}

export type GameStatus = 'playing' | 'won' | 'lost'
