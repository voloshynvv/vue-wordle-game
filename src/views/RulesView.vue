<script setup lang="ts">
import BoardCell from '@/components/game/BoardCell.vue'
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
      <BoardCell letter="t" status="absent" flipped />
      <BoardCell letter="a" status="misplaced" flipped />
      <BoardCell letter="b" status="absent" flipped />
      <BoardCell letter="l" status="misplaced" flipped />
      <BoardCell letter="e" status="correct" flipped />
    </div>

    <div class="bg-slate-800 rounded-2xl p-4 text-left space-y-1.5">
      <div class="flex gap-x-2 items-center">
        <BoardCell class="size-8! text-sm!" letter="t" status="absent" flipped />
        <BoardCell class="size-8! text-sm!" letter="b" status="absent" flipped />
        <p class="text-sm">aren't in the target word at all.</p>
      </div>

      <div class="flex gap-x-2 items-center">
        <BoardCell class="size-8! text-sm!" letter="a" status="misplaced" flipped />
        <BoardCell class="size-8! text-sm!" letter="l" status="misplaced" flipped />
        <p class="text-sm">are in the word, but in the wrong spots.</p>
      </div>

      <div class="flex gap-x-2 items-center">
        <BoardCell class="size-8! text-sm!" letter="e" status="correct" flipped />
        <p class="text-sm">is in the word and in the correct spot.</p>
      </div>
    </div>

    <p>Another try to find matching letters in the target word.</p>

    <div class="flex justify-center gap-x-2">
      <BoardCell letter="f" status="correct" flipped />
      <BoardCell letter="l" status="correct" flipped />
      <BoardCell letter="a" status="correct" flipped />
      <BoardCell letter="s" status="absent" flipped />
      <BoardCell letter="h" status="absent" flipped />
    </div>

    <p>So close!</p>

    <div class="flex justify-center gap-x-2">
      <BoardCell letter="f" status="correct" flipped />
      <BoardCell letter="l" status="correct" flipped />
      <BoardCell letter="a" status="correct" flipped />
      <BoardCell letter="m" status="correct" flipped />
      <BoardCell letter="e" status="correct" flipped />
    </div>

    <p>Got it! 🏆</p>
  </section>
</template>
