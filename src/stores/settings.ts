import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { GUESS_LENGTH } from '@/shared/constants'

export const useSettingsStore = defineStore('settings', () => {
  const guessLength = useLocalStorage('guessLength', GUESS_LENGTH)
  const hardMode = useLocalStorage('hardMode', false)
  const swapButtons = useLocalStorage('swapButtons', false)
  const ignoreKeyboard = useLocalStorage('ignoreKeyboard', false)

  return { guessLength, hardMode, swapButtons, ignoreKeyboard }
})
