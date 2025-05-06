import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import {
  FLIP_DELAY_IN_MS,
  FLIP_DURATION_IN_MS,
  GUESSES_COUNT,
  SHAKE_DURATION_IN_MS,
} from '@/shared/constants'
import { checkGuess, getRandomInt, getRequiredLetters } from '@/shared/game-utils'
import type { GameStatus } from '@/shared/types'
import wordsRaw from '@/data/words.txt?raw'

const WORDS = wordsRaw.split('\n')

export const useGameStore = defineStore('game', () => {
  const settings = useSettingsStore()

  const target = ref('')
  const guesses = ref<string[]>([])
  const currentGuess = ref('')

  const animation = ref<'shake' | 'reveal' | null>(null)

  const status = computed<GameStatus>(() => {
    const latestGuess = guesses.value[guesses.value.length - 1]

    if (latestGuess === target.value) {
      return 'won'
    }

    if (guesses.value.length === GUESSES_COUNT && latestGuess !== target.value) {
      return 'lost'
    }

    return 'playing'
  })

  const isOver = computed(() => {
    return status.value === 'won' || status.value === 'lost'
  })

  const validatedGuesses = computed(() => {
    return guesses.value.map((guess) => checkGuess(guess, target.value))
  })

  const isAnimating = computed(() => animation.value !== null)

  function addGuess() {
    if (isOver.value) return

    if (currentGuess.value.length < settings.guessLength) {
      animation.value = 'shake'

      setTimeout(() => {
        animation.value = null
      }, SHAKE_DURATION_IN_MS)

      return
    }

    if (settings.hardMode && validatedGuesses.value.length > 0) {
      const lastAttempt = validatedGuesses.value[validatedGuesses.value.length - 1]

      const requiredLetters = getRequiredLetters(currentGuess.value, lastAttempt)

      if (requiredLetters.length > 0) {
        alert(`Guess must contain: ${requiredLetters.join(', ')}`)
        return
      }
    }

    guesses.value.push(currentGuess.value)
    currentGuess.value = ''
    animation.value = 'reveal'

    const TOTAL_ANIMATION_DURATION =
      FLIP_DELAY_IN_MS * (settings.guessLength - 1) + FLIP_DURATION_IN_MS

    setTimeout(() => {
      animation.value = null
    }, TOTAL_ANIMATION_DURATION)
  }

  function append(letter: string) {
    if (isOver.value || currentGuess.value.length >= settings.guessLength) {
      return
    }

    currentGuess.value += letter
  }

  function pop() {
    if (isOver.value) return

    currentGuess.value = currentGuess.value.slice(0, -1)
  }

  function init(word?: string) {
    const randomIndex = getRandomInt(0, WORDS.length)
    target.value = word || WORDS[randomIndex]
    guesses.value = []
    currentGuess.value = ''
  }

  return {
    guesses,
    currentGuess,
    target,
    status,
    isOver,
    validatedGuesses,
    animation,
    isAnimating,
    addGuess,
    append,
    pop,
    init,
  }
})
