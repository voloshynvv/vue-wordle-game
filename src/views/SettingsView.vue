<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

import AppSwitchGroup from '@/components/common/AppSwitchGroup.vue'
import NewGameForm from '@/components/game/NewGameForm.vue'

const settings = useSettingsStore()
</script>

<template>
  <h1 class="sr-only">Settings</h1>

  <div class="space-y-16">
    <section>
      <h2 class="mb-1.5 text-xl">Current game</h2>

      <AppSwitchGroup v-model="settings.hardMode" label="Hard Mode" class="border-t" id="hard-mode">
        <template #description>
          <p>Any revealed hints must be used in subsequent guesses</p>
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
    </section>

    <section>
      <h2 class="mb-1.5 text-xl">Create a new game</h2>
      <NewGameForm />
    </section>
  </div>
</template>
