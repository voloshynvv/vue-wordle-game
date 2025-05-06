<script setup lang="ts">
import { GUESS_LENGTH } from '@/shared/constants'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

const errors = {
  limit: 'Exactly 5 letters required',
  required: 'Cannot be empty',
}

type ErrorKey = keyof typeof errors

const userInput = ref('')
const error = ref<ErrorKey | null>(null)

const { copy, copied } = useClipboard({ copiedDuring: 60 * 1000 })

function submit() {
  if (!userInput.value) {
    error.value = 'required'
    return
  }

  if (userInput.value.length !== GUESS_LENGTH) {
    error.value = 'limit'
    return
  }

  error.value = null

  try {
    const encoded = btoa(userInput.value)
    copy(`http://localhost:5173?q=${encoded}`)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <form class="flex items-center gap-x-4" @submit.prevent="submit">
    <div class="relative">
      <input
        class="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2"
        type="text"
        v-model.trim="userInput"
      />

      <span v-if="error" class="absolute top-full left-0 mt-1 text-sm text-red-300">
        {{ errors[error] }}
      </span>
    </div>

    <button>Copy</button>
  </form>

  <p v-if="copied" class="mt-4">Link copied! Challenge your friend to guess the word!</p>
</template>
