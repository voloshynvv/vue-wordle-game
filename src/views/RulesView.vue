<script setup lang="ts">
import GameCell from '@/components/game/GameCell.vue'
</script>

<template>
  <section class="text-center space-y-4">
    <h1 class="sr-only">Rules</h1>

    <p>
      You have to guess the hidden word in 6 tries and the color of the letters changes to show how
      close you are.
    </p>

    <p>To start the game, just enter any word, for example:</p>

    <div class="flex justify-center gap-x-2">
      <GameCell letter="t" status="absent" />
      <GameCell letter="a" status="misplaced" />
      <GameCell letter="b" status="absent" />
      <GameCell letter="l" status="misplaced" />
      <GameCell letter="e" status="correct" />
    </div>

    <div class="bg-slate-800 rounded-2xl p-4 text-left space-y-1.5">
      <div class="flex gap-x-2 items-center">
        <GameCell class="size-8! text-sm!" letter="t" status="absent" />
        <GameCell class="size-8! text-sm!" letter="b" status="absent" />
        <p class="text-sm">aren't in the target word at all.</p>
      </div>

      <div class="flex gap-x-2 items-center">
        <GameCell class="size-8! text-sm!" letter="a" status="misplaced" />
        <GameCell class="size-8! text-sm!" letter="l" status="misplaced" />
        <p class="text-sm">are in the word, but in the wrong spots.</p>
      </div>

      <div class="flex gap-x-2 items-center">
        <GameCell class="size-8! text-sm!" letter="e" status="correct" />
        <p class="text-sm">is in the word and in the correct spot.</p>
      </div>
    </div>

    <p>Another try to find matching letters in the target word.</p>

    <div class="flex justify-center gap-x-2">
      <GameCell letter="f" status="correct" />
      <GameCell letter="l" status="correct" />
      <GameCell letter="a" status="correct" />
      <GameCell letter="s" status="absent" />
      <GameCell letter="h" status="absent" />
    </div>

    <p>So close!</p>

    <div class="flex justify-center gap-x-2">
      <GameCell letter="f" status="correct" />
      <GameCell letter="l" status="correct" />
      <GameCell letter="a" status="correct" />
      <GameCell letter="m" status="correct" />
      <GameCell letter="e" status="correct" />
    </div>

    <p>Got it! 🏆</p>
  </section>
</template>
