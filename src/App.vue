<script setup lang="ts">
import TheHeader from '@/components/navigation/TheHeader.vue'
</script>

<template>
  <div class="max-w-xl mx-auto p-4">
    <TheHeader />

    <main class="py-10">
      <RouterView />
    </main>
  </div>
</template>
