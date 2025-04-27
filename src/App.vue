<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <div class="mx-auto max-w-xl p-4">
    <TheHeader />

    <main class="py-10">
      <RouterView />
    </main>
  </div>
</template>
