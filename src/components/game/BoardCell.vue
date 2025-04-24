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
      class="flex items-center justify-center size-16 border-2 rounded-md border-slate-500 bg-slate-900 text-xl uppercase backface-hidden duration-700 transition-transform"
      :class="{
        'rotate-x-180': flipped,
        'border-slate-300!': letter,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 rotate-x-180 flex items-center justify-center border-2 rounded-md text-xl uppercase backface-hidden duration-700 transition-transform"
      :class="{
        'rotate-x-0!': flipped,
        'bg-green-800 border-green-700': flipped && status === 'correct',
        'bg-yellow-800 border-yellow-700': flipped && status === 'misplaced',
        'bg-zinc-800 border-zinc-700': flipped && status === 'absent',
      }"
      @transitionend="emit('flipEnd')"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>
  </div>
</template>
