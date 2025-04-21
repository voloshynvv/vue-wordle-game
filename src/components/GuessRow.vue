<script setup lang="ts">
import { computed } from 'vue'

const { guess, target, show } = defineProps<{
  guess: string
  target: string
  show?: boolean
}>()

const statuses = computed(() => {
  if (!show) return []

  return guess.split('').map((letter, i) => {
    if (letter === target[i]) {
      return 'correct'
    } else if (target.includes(letter)) {
      return 'misplaced'
    } else {
      return 'absent'
    }
  })
})
</script>

<template>
  <div class="flex gap-x-1">
    <div class="relative" v-for="(_, i) in 4" :key="i">
      <div
        class="flex items-center justify-center size-12 border-2 bg-slate-900 rounded-md uppercase backface-hidden duration-700 transition-transform"
        :class="{
          'rotate-x-180': show,
          'border-slate-500': !guess[i],
          'border-slate-300 animate-pop-in': guess[i],
        }"
        :style="{ transitionDelay: `${i * 0.25}s` }"
      >
        {{ guess[i] }}
      </div>

      <div
        class="absolute inset-0 flex items-center justify-center size-12 border-2 rounded-md uppercase backface-hidden duration-700 transition-transform"
        :class="{
          'rotate-x-0': show,
          'rotate-x-180': !show,
          'bg-green-800 border-green-700': statuses[i] === 'correct',
          'bg-yellow-800 border-yellow-700': statuses[i] === 'misplaced',
          'bg-zinc-800 border-zinc-700': statuses[i] === 'absent',
        }"
        :style="{
          transitionDelay: `${i * 0.25}s`,
        }"
      >
        {{ guess[i] }}
      </div>
    </div>
  </div>
</template>
