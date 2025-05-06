<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { GUESSES_COUNT } from '@/shared/constants'

import BoardRow from './BoardRow.vue'
import GameAnswerPopup from './GameAnswerPopup.vue'

const router = useRouter()
const route = useRoute()

let target = ''

const targetSearchParam = typeof route.query.q === 'string' ? route.query.q : ''
try {
  target = atob(targetSearchParam)
} catch (err) {
  console.log(err)
}

const game = useGameStore()
game.init(target)

const settings = useSettingsStore()

const show = computed(() => {
  return game.isOver
})

function getGuessPerRow(i: number) {
  if (game.guesses[i]) {
    return game.guesses[i]
  }

  if (game.guesses.length === i) {
    return game.currentGuess
  }

  return ''
}

function init() {
  router.push({ query: {} })
  game.init()
}
</script>

<template>
  <div class="relative mx-auto mb-4 w-fit space-y-1 py-10 pb-0">
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

    <GameAnswerPopup :target="game.target" :show @init-new-game="init" />
  </div>

  <p class="mx-auto mb-4 w-fit rounded-full bg-slate-700 px-3 py-0.5 text-center text-sm">
    <template v-if="game.status === 'won'">You won</template>
    <template v-else-if="game.status === 'lost'">You lost</template>
    <template v-else>Try to guess a word</template>
  </p>
</template>
