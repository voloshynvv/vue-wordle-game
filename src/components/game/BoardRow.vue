<script setup lang="ts">
import type { ValidatedLetter } from '@/shared/types'
import { FLIP_DELAY_IN_MS } from '@/shared/constants'

import BoardCell from './BoardCell.vue'

const {
  guess,
  guessLength,
  validatedGuess = [],
} = defineProps<{
  guess: string
  guessLength: number
  validatedGuess?: ValidatedLetter[]
}>()
</script>

<template>
  <div class="flex gap-x-1">
    <BoardCell
      v-for="(_, i) in guessLength"
      :key="i"
      :letter="guess[i] ?? ''"
      :status="validatedGuess[i]?.status"
      :flipped="Boolean(validatedGuess[i]?.status)"
      :class="{ 'animate-pop-in': guess[i] }"
      :style="{
        transitionDelay: `${i * FLIP_DELAY_IN_MS}ms`,
      }"
    />
  </div>
</template>
