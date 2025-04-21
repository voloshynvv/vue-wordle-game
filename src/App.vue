<script setup lang="ts">
import { computed, ref } from 'vue'
import GuessRow from './components/GuessRow.vue'

const target = 'test'

const guesses = ref<string[]>([])
const currentGuess = ref('')

const isGameOver = computed(() => {
  return guesses.value[guesses.value.length - 1] === target
})

function addUserGuess() {
  if (currentGuess.value.length > 4) {
    return
  }

  guesses.value.push(currentGuess.value)
  currentGuess.value = ''
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
    <h1 class="font-semibold text-3xl">Wordle</h1>

    <div class="space-y-1 mx-auto w-fit">
      <GuessRow
        v-for="(_, i) in 6"
        :key="i"
        :guess="getCurrentGuess(i)"
        :show="Boolean(guesses[i])"
        :target
      />
    </div>

    <input class="border" type="text" v-model="currentGuess" />
    <button @click="addUserGuess">click</button>
  </main>
</template>
