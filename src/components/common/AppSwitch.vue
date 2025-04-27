<script setup lang="ts">
const model = defineModel()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input class="sr-only peer" type="checkbox" v-bind="$attrs" v-model="model" />
    <div
      class="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all! dark:border-slate-700 peer-checked:bg-slate-500 dark:peer-checked:bg-blue-600"
    ></div>
  </label>
</template>
