<script setup lang="ts">
import { FLIP_DURATION_IN_MS } from '@/shared/constants'
import type { CellStatus } from '@/shared/types'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  letter: string
  status?: CellStatus
  flipped?: boolean
}>()
</script>

<template>
  <div class="relative w-fit">
    <div
      class="flex size-12 items-center justify-center rounded-md border-2 border-slate-500 bg-slate-900 text-xl uppercase transition-transform duration-700 backface-hidden sm:size-16"
      :class="{
        'rotate-x-180': flipped,
        'unset-transition': !flipped,
        'border-slate-300!': letter,
      }"
      v-bind="$attrs"
      :style="{
        transitionDuration: `${FLIP_DURATION_IN_MS}ms`,
      }"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 flex rotate-x-180 items-center justify-center rounded-md border-2 text-xl text-white uppercase transition-transform duration-700 backface-hidden"
      :class="{
        'rotate-x-0!': flipped,
        'unset-transition': !flipped,
        'border-green-700 bg-green-800': status === 'correct',
        'border-yellow-700 bg-yellow-800': status === 'misplaced',
        'border-zinc-700 bg-zinc-800': status === 'absent',
      }"
      v-bind="$attrs"
      :style="{
        transitionDuration: `${FLIP_DURATION_IN_MS}ms`,
      }"
    >
      {{ letter }}
    </div>
  </div>
</template>

<style scoped>
.unset-transition {
  transition: 0ms !important;
}
</style>
