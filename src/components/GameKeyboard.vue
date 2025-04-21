<script setup lang="ts">
const model = defineModel({ required: true })
</script>

<template>
  <input v-model="model" class="border" type="text" />
  <button>submit</button>
</template>
