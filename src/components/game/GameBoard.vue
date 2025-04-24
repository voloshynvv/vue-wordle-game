<script setup lang="ts">
import { ref, watch } from 'vue'
import { GUESSES_COUNT } from '@/constants/game'
import { useGameStore } from '@/stores/game'

import BoardRow from './BoardRow.vue'

const game = useGameStore()
const animate = ref(false)

watch(
  () => game.animation === 'shake',
  () => {
    animate.value = true

    setTimeout(() => {
      animate.value = false
      game.animation = 'idle'
    }, 300)
  },
)

function getCurrentGuess(i: number) {
  if (game.guesses[i]) {
    return game.guesses[i]
  }

  if (game.guesses.length === i) {
    return game.currentGuess
  }

  return ''
}
</script>

<template>
  <div class="space-y-1 mx-auto w-fit mb-4">
    <BoardRow
      v-for="(_, i) in GUESSES_COUNT"
      :key="i"
      :guess="getCurrentGuess(i)"
      :is-guess-visible="Boolean(game.guesses[i])"
      :target="game.target"
      :class="{ 'animate-shake': animate && game.guesses.length === i }"
    />
  </div>

  <p class="text-center mb-4 text-sm rounded-full bg-slate-700 px-3 py-0.5 w-fit mx-auto">
    <template v-if="game.status === 'won'">You won</template>
    <template v-else-if="game.status === 'lost'">You lost</template>
    <template v-else>Try to guess a word</template>
  </p>
</template>
