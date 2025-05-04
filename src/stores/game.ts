import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import {
  FLIP_DELAY_IN_MS,
  FLIP_DURATION_IN_MS,
  GUESSES_COUNT,
  SHAKE_DURATION_IN_MS,
} from '@/shared/constants'
import { checkGuess, getRequiredLetters } from '@/shared/game-utils'
import type { GameStatus } from '@/shared/types'
import words from '@/data.txt?raw'

export const useGameStore = defineStore('game', () => {
  const settings = useSettingsStore()

  const target = words.split('\n')[0]

  const animation = ref<'shake' | 'reveal' | null>(null)

  const guesses = ref<string[]>([])
  const currentGuess = ref('')
  const shouldAnimateRow = ref(false)

  const status = computed<GameStatus>(() => {
    const latestGuess = guesses.value[guesses.value.length - 1]

    if (latestGuess === target) {
      return 'won'
    }

    if (guesses.value.length === GUESSES_COUNT && latestGuess !== target) {
      return 'lost'
    }

    return 'playing'
  })

  const isOver = computed(() => {
    return status.value === 'won' || status.value === 'lost'
  })

  const validatedGuesses = computed(() => {
    return guesses.value.map((guess) => checkGuess(guess, target))
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
    console.log('append runs')

    if (isOver.value || currentGuess.value.length >= settings.guessLength) {
      return
    }

    currentGuess.value += letter
  }

  function pop() {
    if (isOver.value) return

    currentGuess.value = currentGuess.value.slice(0, -1)
  }

  function reset() {
    guesses.value = []
    currentGuess.value = ''
  }

  watch(
    () => settings.hardMode,
    () => {
      reset()
    },
  )

  return {
    guesses,
    currentGuess,
    target,
    status,
    isOver,
    validatedGuesses,
    animation,
    isAnimating,
    shouldAnimateRow,
    addGuess,
    append,
    pop,
    reset,
  }
})
