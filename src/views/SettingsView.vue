<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useDark } from '@vueuse/core'

import AppSwitchGroup from '@/components/common/AppSwitchGroup.vue'

const isDark = useDark()
const settings = useSettingsStore()
</script>

<template>
  <h1 class="sr-only">Settings</h1>

  <p class="mb-2 text-center">Number of letters</p>

  <div class="mb-8 flex justify-center gap-x-4">
    <button
      class="size-10 cursor-pointer rounded-sm border-0 border-neutral-400 bg-neutral-200 p-1 transition-[scale,background-color] hover:scale-110 focus-visible:scale-110 dark:border-slate-500 dark:bg-slate-800"
      :class="{
        'scale-110 border-2 border-dashed': settings.guessLength === 4,
      }"
      @click="settings.guessLength = 4"
    >
      4
    </button>

    <button
      class="size-10 cursor-pointer rounded-sm border-0 border-neutral-400 bg-neutral-200 p-1 transition-[scale,background-color] hover:scale-110 focus-visible:scale-110 dark:border-slate-500 dark:bg-slate-800"
      :class="{
        'scale-110 border-2 border-dashed': settings.guessLength === 5,
      }"
      @click="settings.guessLength = 5"
    >
      5
    </button>

    <button
      class="size-10 cursor-pointer rounded-sm border-0 border-neutral-400 bg-neutral-200 p-1 transition-[scale,background-color] hover:scale-110 focus-visible:scale-110 dark:border-slate-500 dark:bg-slate-800"
      :class="{
        'scale-110 border-2 border-dashed': settings.guessLength === 6,
      }"
      @click="settings.guessLength = 6"
    >
      6
    </button>
  </div>

  <AppSwitchGroup
    v-model="settings.hardMode"
    label="Hard Mode"
    description="Any revealed hints must be used in subsequent guesses"
    class="border-t"
    id="hard-mode"
  />

  <AppSwitchGroup
    v-model="settings.ignoreKeyboard"
    label="Onscreen Keyboard Input Only"
    description="Ignore key input except from the onscreen keyboard. Most helpful for users using speech recognition or other assistive devices."
    id="ignore-keyboard"
  />

  <AppSwitchGroup
    v-model="settings.swapButtons"
    label="Swap Buttons"
    description='Swap "Enter" and "Backspace" buttons'
    id="swap-buttons"
  />

  <AppSwitchGroup v-model="isDark" label="Dark Mode" id="dark-mode" />
</template>
