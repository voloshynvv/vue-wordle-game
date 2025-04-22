<script setup lang="ts">
const { status = '' } = defineProps<{
  letter: string
  status?: 'misplaced' | 'correct' | 'absent'
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center justify-center size-16 border-2 border-slate-500 bg-slate-900 rounded-md text-xl uppercase backface-hidden duration-700 transition-transform"
      :class="{
        'rotate-x-180': status,
        'border-slate-300! animate-pop-in': letter,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>

    <div
      class="absolute inset-0 flex items-center justify-center size-16 border-2 rounded-md text-xl uppercase backface-hidden rotate-x-180 duration-700 transition-transform"
      :class="{
        'rotate-x-0!': status,
        [status]: true,
      }"
      v-bind="$attrs"
    >
      {{ letter }}
    </div>
  </div>
</template>
