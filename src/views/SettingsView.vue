<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
</script>

<template>
  <h1>Settings</h1>

  <div class="flex items-center gap-x-10">
    <label>
      4
      <input type="radio" :value="4" v-model="settings.guessLength" />
    </label>

    <label>
      5
      <input type="radio" :value="5" v-model="settings.guessLength" />
    </label>

    <label>
      6
      <input type="radio" :value="6" v-model="settings.guessLength" />
    </label>
  </div>
  
</template>
