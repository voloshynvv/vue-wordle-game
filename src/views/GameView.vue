<script setup lang="ts">
import { computed, ref } from 'vue'

import GuessRow from '@/components/GuessRow.vue'
import GameKeyboard from '@/components/GameKeyboard.vue'

const target = 'test'

const guesses = ref<string[]>([])
const currentGuess = ref('')
const animate = ref(false)

const isTransitionStarted = ref(false)

const gameStatus = ref<'won' | 'playing' | 'lost'>('playing')

const absentLetters = computed(() => {
  const unique = new Set(
    guesses.value.flatMap((guess) => guess.split('')).filter((letter) => !target.includes(letter)),
  )

  return [...unique]
})

const isGameOver = computed(() => {
  return gameStatus.value === 'lost' || gameStatus.value === 'won'
})

function addGuess(keyCode: string) {
  if (isGameOver.value) return

  if (keyCode === 'Enter') {
    if (currentGuess.value.length < 4) {
      animate.value = true

      setTimeout(() => {
        animate.value = false
      }, 300)

      return
    }

    guesses.value.push(currentGuess.value)

    if (currentGuess.value === target) {
      gameStatus.value = 'won'
    }

    if (guesses.value.length === 6) {
      gameStatus.value = 'lost'
    }

    currentGuess.value = ''

    return
  }

  if (keyCode === 'Backspace') {
    currentGuess.value = currentGuess.value.slice(0, -1)
    return
  }

  if (currentGuess.value.length >= 4) {
    return
  }

  currentGuess.value += keyCode
}

function getCurrentGuess(rowIndex: number) {
  if (guesses.value[rowIndex]) {
    return guesses.value[rowIndex]
  }

  if (guesses.value.length === rowIndex) {
    return currentGuess.value
  }

  return ''
}
</script>

<template>
  <div class="flex gap-x-2 mb-3">
    <h1 class="font-semibold text-3xl">Wordle</h1>
    <button>+</button>
  </div>

  <div class="space-y-1 mx-auto w-fit mb-2">
    <GuessRow
      v-model="isTransitionStarted"
      v-for="(_, i) in 6"
      :key="i"
      :class="{ 'animate-shake': animate && guesses.length === i }"
      :guess="getCurrentGuess(i)"
      :show="Boolean(guesses[i])"
      :target
    />
  </div>

  <p class="text-center mb-2 text-sm rounded-full bg-slate-700 px-3 py-0.5 w-fit mx-auto">
    <template v-if="gameStatus === 'won'">You won</template>
    <template v-else-if="gameStatus === 'lost'">You lost</template>
    <template v-else>Try to guess a word</template>
  </p>

  <!-- <GameKeyboard :guesses :target :guess="currentGuess" :isTransitionStarted @submit="addGuess" /> -->
  <GameKeyboard :guess="currentGuess" :absent="absentLetters" @submit="console.log" />
</template>
