<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { GUESSES_COUNT } from '@/shared/constants'

import BoardRow from './BoardRow.vue'

const game = useGameStore()
const settings = useSettingsStore()

function getGuessPerRow(i: number) {
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
  <div class="mx-auto mb-4 w-fit space-y-1">
    <div class="space-y-1">
      <BoardRow
        v-for="(_, i) in GUESSES_COUNT"
        :key="i"
        :guess="getGuessPerRow(i)"
        :validated-guess="game.validatedGuesses[i]"
        :guess-length="settings.guessLength"
        :class="{ 'animate-shake': game.animation === 'shake' && game.guesses.length === i }"
      />
    </div>
  </div>

  <p class="mx-auto mb-4 w-fit rounded-full bg-slate-700 px-3 py-0.5 text-center text-sm">
    <template v-if="game.status === 'won'">You won</template>
    <template v-else-if="game.status === 'lost'">You lost</template>
    <template v-else>Try to guess a word</template>
  </p>
</template>
