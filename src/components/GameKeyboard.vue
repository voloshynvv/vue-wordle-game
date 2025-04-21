<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
]

const { guesses, target } = defineProps<{
  guesses: string[]
  target: string
}>()

const emit = defineEmits<{
  submit: [key: string]
}>()

const hasFocus = ref()

const absentLetters = computed(() => {
  const unique = new Set(
    guesses.flatMap((guess) => guess.split('')).filter((letter) => !target.includes(letter)),
  )

  return [...unique]
})

function handleKeydown(e: KeyboardEvent) {
  const { key } = e

  if (!keyboard.flat().includes(key) || (hasFocus.value && key === 'Enter')) {
    return
  }

  emit('submit', key)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="space-y-1">
    <div class="flex justify-center gap-x-1" v-for="(keys, i) in keyboard" :key="i">
      <button
        class="bg-slate-700 text-white test p-1.5 px-3 rounded-sm cursor-pointer uppercase test transition-colors hover:bg-slate-800"
        v-for="key in keys"
        :key
        :class="[absentLetters.includes(key) && 'absent']"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
        @click="emit('submit', key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
