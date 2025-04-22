import { createWebHistory, createRouter } from 'vue-router'

import GameView from '@/views/GameView.vue'
import SettingsView from '@/views/SettingsView.vue'
import RulesView from '@/views/RulesView.vue'

const routes = [
  { path: '/', component: GameView },
  { path: '/settings', component: SettingsView },
  { path: '/rules', component: RulesView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
