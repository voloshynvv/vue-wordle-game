import type { ValidatedLetter } from './types'

export function checkGuess(guess: string, target: string) {
  const validatedGuess: ValidatedLetter[] = []
  const targetLetters = target.split('')
  const guessLetters = guess.split('')
  const used = Array(target.length).fill(false)

  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      validatedGuess[i] = { letter, status: 'correct' }
      used[i] = true
    }
  })

  guessLetters.forEach((letter, i) => {
    if (validatedGuess[i]) return

    const foundIndex = targetLetters.findIndex((t, idx) => t === letter && !used[idx])

    if (foundIndex !== -1) {
      validatedGuess[i] = { letter, status: 'misplaced' }
      used[foundIndex] = true
    } else {
      validatedGuess[i] = { letter, status: 'absent' }
    }
  })

  return validatedGuess
}

export function getRequiredLetters(currentGuess: string, validatedGuess: ValidatedLetter[]) {
  return validatedGuess
    .filter((item) => item.status !== 'absent' && !currentGuess.includes(item.letter))
    .map((item) => item.letter.toUpperCase())
}
