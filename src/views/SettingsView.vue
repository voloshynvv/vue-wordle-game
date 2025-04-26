<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import AppSwitch from '@/components/common/AppSwitch.vue'

const settings = useSettingsStore()
</script>

<template>
  <h1 class="sr-only">Settings</h1>

  <p class="mb-2">Length</p>

  <div class="grid grid-cols-3 gap-3 mb-8">
    <button
      class="rounded-sm p-1 bg-slate-700 cursor-pointer"
      :class="{
        'bg-slate-800': settings.guessLength === 4,
      }"
      @click="settings.guessLength = 4"
    >
      4
    </button>

    <button
      class="rounded-sm p-1 bg-slate-700 cursor-pointer"
      :class="{
        'bg-slate-800': settings.guessLength === 5,
      }"
      @click="settings.guessLength = 5"
    >
      5
    </button>

    <button
      class="rounded-sm p-1 bg-slate-700 cursor-pointer"
      :class="{
        'bg-slate-800': settings.guessLength === 6,
      }"
      @click="settings.guessLength = 6"
    >
      6
    </button>
  </div>

  <div class="flex items-center justify-between gap-x-4 py-4 border-t border-b border-slate-600">
    <div class="space-y-1">
      <label class="block" for="hard-mode">Hard mode</label>
      <p class="text-xs text-slate-300">Any revealed hints must be used in subsequent guesses</p>
    </div>

    <AppSwitch id="hard-mode" v-model="settings.hardMode" />
  </div>

  <div class="flex items-center justify-between gap-x-4 py-4 border-b border-slate-600">
    <div class="space-y-1">
      <label class="block" for="dark-mode">Dark mode</label>
    </div>

    <AppSwitch id="dark-mode" />
  </div>

  <div class="flex items-center justify-between gap-x-4 py-4 border-b border-slate-600">
    <div class="space-y-1">
      <label class="block" for="colors-blind">Reduce motion</label>
    </div>

    <AppSwitch id="colors-blind" />
  </div>

  <div class="flex items-center justify-between gap-x-4 py-4 border-b border-slate-600">
    <div class="space-y-1">
      <label class="block" for="ignore-keyboard">Onscreen Keyboard Input Only</label>
      <p class="text-xs text-slate-300">
        Ignore key input except from the onscreen keyboard. Most helpful for users using speech
        recognition or other assistive devices.
      </p>
    </div>

    <AppSwitch id="ignore-keyboard" v-model="settings.ignoreKeyboard" />
  </div>

  <div class="flex items-center justify-between gap-x-4 py-4 border-b border-slate-600">
    <div class="space-y-1">
      <label class="block" for="swap-buttons">Swap Buttons</label>
      <p class="text-xs text-slate-300">Swap "Enter" and "Backspace" buttons</p>
    </div>

    <AppSwitch id="swap-buttons" v-model="settings.swapButtons" />
  </div>
</template>
