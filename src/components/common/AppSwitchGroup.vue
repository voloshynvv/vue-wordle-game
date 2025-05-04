<script setup lang="ts">
import AppSwitch from '@/components/common/AppSwitch.vue'

defineProps<{
  id: string
  label: string
}>()

const model = defineModel()
</script>

<template>
  <div class="flex items-center justify-between gap-x-4 border-b border-slate-600 py-4">
    <div class="space-y-1">
      <label class="block" :for="id">{{ label }}</label>

      <div v-if="$slots.description" class="text-sm text-slate-300">
        <slot name="description" />
      </div>
    </div>

    <AppSwitch :id v-model="model" />
  </div>
</template>
