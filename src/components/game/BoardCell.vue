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
  <div class="relative">
    <div
      class="flex size-16 items-center justify-center rounded-md border-2 border-slate-500 bg-slate-900 text-xl uppercase transition-transform backface-hidden"
      :class="{
        'rotate-x-180': flipped,
        'border-slate-300!': letter,
      }"
      :style="{
        transitionDuration: `${FLIP_DURATION_IN_MS}ms`,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 flex rotate-x-180 items-center justify-center rounded-md border-2 text-xl text-white uppercase transition-transform backface-hidden"
      :class="{
        'rotate-x-0!': flipped,
        'border-green-700 bg-green-800': flipped && status === 'correct',
        'border-yellow-700 bg-yellow-800': flipped && status === 'misplaced',
        'border-zinc-700 bg-zinc-800': flipped && status === 'absent',
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
