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
      class="flex items-center justify-center size-16 border-2 rounded-md bg-neutral-100 border-neutral-200 dark:bg-slate-900 dark:border-slate-500 text-xl uppercase backface-hidden duration-700 transition-transform"
      :class="{
        'rotate-x-180': flipped,
        'border-neutral-300 dark:border-slate-300!': letter,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 rotate-x-180 flex items-center justify-center border-2 rounded-md text-xl uppercase backface-hidden text-white duration-700 transition-transform"
      :class="{
        'rotate-x-0!': flipped,
        'bg-green-600 border-green-500 dark:bg-green-800 dark:border-green-700':
          flipped && status === 'correct',
        'bg-yellow-600 border-yellow-500 dark:bg-yellow-800 dark:border-yellow-700':
          flipped && status === 'misplaced',
        'bg-zinc-600 border-zinc-500 dark:bg-zinc-800 dark:border-zinc-700':
          flipped && status === 'absent',
      }"
      @transitionend="emit('flipEnd')"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>
  </div>
</template>
