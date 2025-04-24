import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { GUESSES_COUNT } from '@/constants/game'
import { useSettingsStore } from './settings'

export const useGameStore = defineStore('game', () => {
  const target = 'work'
  const settings = useSettingsStore()

  const guesses = ref<string[]>([])
  const currentGuess = ref('')

  const animation = ref<'idle' | 'shake' | 'flip'>('idle')

  const status = computed(() => {
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
    return status.value !== 'playing'
  })

  function addGuess() {
    if (isOver.value) return

    if (currentGuess.value.length < settings.guessLength) {
      animation.value = 'shake'

      return
    }

    animation.value = 'idle'
    guesses.value.push(currentGuess.value)
    currentGuess.value = ''
  }

  function append(letter: string) {
    if (currentGuess.value.length >= settings.guessLength || isOver.value) return

    currentGuess.value += letter
  }

  function pop() {
    if (isOver.value) return

    currentGuess.value = currentGuess.value.slice(0, -1)
  }

  return {
    guesses,
    currentGuess,
    animation,
    target,
    status,
    isOver,
    addGuess,
    append,
    pop,
  }
})
