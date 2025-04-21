<script setup lang="ts">
import { computed, ref } from 'vue'
import GuessRow from './components/GuessRow.vue'
import GameKeyboard from './components/GameKeyboard.vue'

const target = 'test'

const guesses = ref<string[]>([])
const currentGuess = ref('')
const animate = ref(false)

const isGameOver = computed(() => {
  return guesses.value[guesses.value.length - 1] === target
})

function handleUserGuess(keyCode: string) {
  if (isGameOver.value) {
    return
  }

  if (keyCode === 'Enter') {
    if (currentGuess.value.length >= 4) {
      guesses.value.push(currentGuess.value)
      currentGuess.value = ''
    } else {
      animate.value = true

      setTimeout(() => {
        animate.value = false
      }, 300)
    }

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
  <main class="max-w-xl mx-auto p-4">
    <div class="flex gap-x-2 mb-4">
      <h1 class="font-semibold text-3xl">Wordle</h1>
      <button>+</button>
    </div>

    <div class="space-y-1 mx-auto w-fit mb-4">
      <GuessRow
        v-for="(_, i) in 6"
        :key="i"
        :guess="getCurrentGuess(i)"
        :show="Boolean(guesses[i])"
        :target
        :class="{ 'animate-shake': animate && guesses.length === i }"
      />
    </div>

    <GameKeyboard :guesses :target @submit="handleUserGuess" />
  </main>
</template>
