<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
]

const game = useGameStore()

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

function handleKeydown(e: KeyboardEvent) {
  const { key } = e

  if (!keyboard.flat().includes(key) || (hasFocus.value && key === 'Enter')) {
    return
  }

  handleKey(key)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
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
