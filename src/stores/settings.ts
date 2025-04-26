import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const guessLength = useLocalStorage('guessLength', 4)
  const hardMode = useLocalStorage('hardMode', false)
  const swapButtons = useLocalStorage('swapButtons', false)
  const ignoreKeyboard = useLocalStorage('ignoreKeyboard', false)

  return { guessLength, hardMode, swapButtons, ignoreKeyboard }
})
