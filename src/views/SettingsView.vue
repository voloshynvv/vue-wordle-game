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

  <div class="flex gap-x-4 justify-center mb-8">
    <button
      class="rounded-sm p-1 border-0 border-neutral-400 dark:border-slate-500 size-10 cursor-pointer transition-[scale,background-color] bg-neutral-200 dark:bg-slate-800 hover:scale-110 focus-visible:scale-110"
      :class="{
        'border-2 border-dashed scale-110': settings.guessLength === 4,
      }"
      @click="settings.guessLength = 4"
    >
      4
    </button>

    <button
      class="rounded-sm p-1 border-0 border-neutral-400 dark:border-slate-500 size-10 cursor-pointer transition-[scale,background-color] bg-neutral-200 dark:bg-slate-800 hover:scale-110 focus-visible:scale-110"
      :class="{
        'border-2 border-dashed scale-110': settings.guessLength === 5,
      }"
      @click="settings.guessLength = 5"
    >
      5
    </button>

    <button
      class="rounded-sm p-1 border-0 border-neutral-400 dark:border-slate-500 size-10 cursor-pointer transition-[scale,background-color] bg-neutral-200 dark:bg-slate-800 hover:scale-110 focus-visible:scale-110"
      :class="{
        'border-2 border-dashed scale-110': settings.guessLength === 6,
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
