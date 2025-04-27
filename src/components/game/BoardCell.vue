<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  letter: string
  status?: 'misplaced' | 'correct' | 'absent'
  flipped?: boolean
}>()

const emit = defineEmits<{
  flipEnd: []
}>()
</script>

<template>
  <div class="relative">
    <div
      class="flex size-16 items-center justify-center rounded-md border-2 border-neutral-200 bg-neutral-100 text-xl uppercase transition-transform duration-700 backface-hidden dark:border-slate-500 dark:bg-slate-900"
      :class="{
        'rotate-x-180': flipped,
        'border-neutral-300 dark:border-slate-300!': letter,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 flex rotate-x-180 items-center justify-center rounded-md border-2 text-xl text-white uppercase transition-transform duration-700 backface-hidden"
      :class="{
        'rotate-x-0!': flipped,
        'border-green-500 bg-green-600 dark:border-green-700 dark:bg-green-800':
          flipped && status === 'correct',
        'border-yellow-500 bg-yellow-600 dark:border-yellow-700 dark:bg-yellow-800':
          flipped && status === 'misplaced',
        'border-zinc-500 bg-zinc-600 dark:border-zinc-700 dark:bg-zinc-800':
          flipped && status === 'absent',
      }"
      @transitionend="emit('flipEnd')"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>
  </div>
</template>
