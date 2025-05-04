<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import AppSwitchGroup from '@/components/common/AppSwitchGroup.vue'

const settings = useSettingsStore()
</script>

<template>
  <AppSwitchGroup v-model="settings.hardMode" label="Hard Mode" class="border-t" id="hard-mode">
    <template #description>
      <p>Any revealed hints must be used in subsequent guesses</p>
      <p class="mt-1 text-xs">The game will be restarted</p>
    </template>
  </AppSwitchGroup>

  <AppSwitchGroup
    v-model="settings.ignoreKeyboard"
    label="Onscreen Keyboard Input Only"
    id="ignore-keyboard"
  >
    <template #description>
      <p>
        Ignore key input except from the onscreen keyboard. Most helpful for users using speech
        recognition or other assistive devices.
      </p>
    </template>
  </AppSwitchGroup>

  <AppSwitchGroup v-model="settings.swapButtons" label="Swap Buttons" id="swap-buttons">
    <template #description>
      <p>Swap "Enter" and "Backspace" buttons</p>
    </template>
  </AppSwitchGroup>
</template>
