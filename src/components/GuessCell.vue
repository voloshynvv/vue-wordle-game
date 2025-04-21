<script setup lang="ts">
type Status = 'default' | 'correct' | 'present' | 'absent'

const { status = 'default' } = defineProps<{
  char: string
  status?: Status
}>()

const colors: Record<Status, string> = {
  default: 'var(--color-zinc-300)',
  correct: 'var(--color-green-600)',
  absent: 'var(--color-zinc-600)',
  present: 'var(--color-yellow-600)',
}
</script>

<template>
  <div
    class="flex justify-center text-white border border-red-200 bg-black items-center size-8 rounded-sm"
    :style="{ backgroundColor: colors[status] }"
  >
    {{ char }}
  </div>
</template>

<style scoped></style>
