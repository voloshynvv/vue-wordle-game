<script setup lang="ts">
import { computed } from 'vue'

const { guess, target, show } = defineProps<{
  guess: string
  target: string
  show?: boolean
}>()

const statuses = computed(() => {
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
</script>

<template>
  <div class="flex gap-x-1">
    <div class="relative" v-for="(_, i) in 4" :key="i">
      <div
        class="flex items-center justify-center size-16 border-2 bg-slate-900 rounded-md text-xl uppercase backface-hidden duration-700 transition-transform"
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
        class="absolute inset-0 flex items-center justify-center size-16 border-2 rounded-md text-xl uppercase backface-hidden duration-700 transition-transform"
        :class="{
          'rotate-x-0': show,
          'rotate-x-180': !show,
          [statuses[i]]: show,
        }"
        :style="{ transitionDelay: `${i * 0.25}s` }"
      >
        {{ guess[i] }}
      </div>
    </div>
  </div>
</template>
