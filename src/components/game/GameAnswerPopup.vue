<script setup lang="ts">
defineProps<{ target: string; show?: boolean }>()

const emit = defineEmits<{
  resetGame: []
}>()
</script>

<template>
  <Transition>
    <div
      v-if="show"
      class="absolute top-4 left-1/2 min-w-64 -translate-1/2 rounded bg-slate-700 p-4 text-center shadow-2xl shadow-slate-700/50"
    >
      <p class="mb-1.5 uppercase">{{ target }}</p>

      <button @click="emit('resetGame')" class="cursor-pointer rounded-sm border px-2 py-0.5">
        play again
      </button>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.15s;
}

.v-enter-active {
  transition-delay: 2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0.65;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  scale: 1;
}
</style>
