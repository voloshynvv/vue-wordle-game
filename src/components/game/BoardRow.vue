<script setup lang="ts">
import { computed, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'

import BoardCell from './BoardCell.vue'
import { useGameStore } from '@/stores/game'

const { guess, target, isGuessVisible } = defineProps<{
  guess: string
  target: string
  isGuessVisible?: boolean
}>()

const settings = useSettingsStore()
const game = useGameStore()

const checkedGuess = computed(() => {
  return guess.split('').map((letter, i) => {
    if (letter === target[i]) {
      return 'correct'
    }

    if (target.includes(letter)) {
      return 'misplaced'
    }

    return 'absent'
  })
})

watch(
  () => isGuessVisible,
  () => {
    console.log('runs')

    game.animation = 'flip'
  },
)

let animated = 0

function handleFlipEnd() {
  animated++

  if (animated === guess.length) {
    game.animation = 'idle'
  }
}
</script>

<template>
  <div class="flex gap-x-1">
    <BoardCell
      v-for="(_, i) in settings.guessLength"
      :key="i"
      :letter="guess[i] ?? ''"
      :status="checkedGuess[i]"
      :flipped="isGuessVisible"
      :style="{
        transitionDelay: `${i * 0.25}s`,
      }"
      :class="{ 'animate-pop-in': guess[i] }"
      @flip-end="handleFlipEnd"
    />
  </div>
</template>
