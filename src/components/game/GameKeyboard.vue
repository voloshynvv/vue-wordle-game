<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
const game = useGameStore()

const keyboard = computed(() => {
  return [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    [
      settings.swapButtons ? 'Backspace' : 'Enter',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      settings.swapButtons ? 'Enter' : 'Backspace',
    ],
  ]
})

const hasFocus = ref()

function handleKey(keyCode: string) {
  if (game.animation === 'flip') {
    return
  }

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
    <div class="flex justify-center gap-x-1" v-for="(keys, i) in keyboard" :key="i">
      <button
        v-for="keyCode in keys"
        :key="keyCode"
        class="bg-slate-700 text-white p-1.5 px-3 rounded-sm cursor-pointer uppercase transition-[background-color,opacity] disabled:cursor-default hover:not-disabled:bg-slate-800"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
        @click="handleKey(keyCode)"
      >
        {{ keyCode }}
      </button>
    </div>
  </div>
</template>
