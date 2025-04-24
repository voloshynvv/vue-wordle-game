<script setup lang="ts"></script>

<template>
  <header class="flex items-baseline justify-between gap-x-4">
    <RouterLink to="/" class="text-bold text-xl uppercase">Wordle</RouterLink>

    <nav class="space-x-4">
      <RouterLink to="/settings" class="text-sm">settings</RouterLink>
      <RouterLink to="/rules" class="text-sm">rules</RouterLink>
    </nav>
  </header>
</template>
