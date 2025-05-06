<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
const game = useGameStore()

const hasFocus = ref()

const keyboard = computed(() => {
  return [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    [
      settings.swapButtons ? 'Enter' : 'Backspace',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      settings.swapButtons ? 'Backspace' : 'Enter',
    ],
  ]
})

function handleKey(keyCode: string) {
  if (game.isAnimating) return

  if (keyCode === 'Enter') {
    game.addGuess()
    return
  }

  if (keyCode === 'Backspace') {
    game.pop()
    return
  }

  game.append(keyCode)
}

function handleKeydownEvent(e: KeyboardEvent) {
  const { key } = e

  if (!keyboard.value.flat().includes(key) || (hasFocus.value && key === 'Enter')) {
    return
  }

  handleKey(key)
}

onMounted(() => {
  if (!settings.ignoreKeyboard) {
    window.addEventListener('keydown', handleKeydownEvent)
  }
})

onUnmounted(() => window.removeEventListener('keydown', handleKeydownEvent))
</script>

<template>
  <div class="space-y-1">
    <div class="flex flex-wrap justify-center gap-1" v-for="(keys, i) in keyboard" :key="i">
      <button
        v-for="keyCode in keys"
        :key="keyCode"
        class="cursor-pointer rounded-sm bg-slate-700 p-2 text-sm text-white uppercase transition-[background-color,opacity] hover:bg-slate-800 disabled:cursor-default sm:p-1.5 sm:text-base md:px-3"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
        @click="handleKey(keyCode)"
      >
        {{ keyCode }}
      </button>
    </div>
  </div>
</template>
