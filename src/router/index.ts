import { createWebHistory, createRouter } from 'vue-router'

import GameView from '@/views/GameView.vue'

const routes = [
  { path: '/', component: GameView },
  { path: '/settings', component: () => import('@/views/SettingsView.vue') },
  { path: '/rules', component: () => import('@/views/RulesView.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
