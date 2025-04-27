<script setup lang="ts">
const model = defineModel()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <label class="inline-flex cursor-pointer items-center">
    <input class="peer sr-only" type="checkbox" v-bind="$attrs" v-model="model" />
    <div
      class="peer relative h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-slate-500 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-200 after:bg-white after:transition-all! after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-slate-700 dark:bg-slate-800 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"
    ></div>
  </label>
</template>
