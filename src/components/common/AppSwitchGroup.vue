<script setup lang="ts">
import AppSwitch from '@/components/common/AppSwitch.vue'

defineProps<{
  id: string
  label: string
  description?: string
}>()

const model = defineModel()
</script>

<template>
  <div
    class="flex items-center justify-between gap-x-4 py-4 border-b border-neutral-200 dark:border-slate-600"
  >
    <div class="space-y-1">
      <label class="block" :for="id">{{ label }}</label>
      <p class="text-sm text-neutral-700 dark:text-slate-300" v-if="description">
        {{ description }}
      </p>
    </div>

    <AppSwitch :id v-model="model" />
  </div>
</template>
