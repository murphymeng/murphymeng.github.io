// router.js 或 router.ts 
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import AddHabit from '@/views/add-habit.vue'
import HabbitList from '@/views/habit-list.vue'
import RewardList from '@/views/reward-list.vue'
import HabbitHistory from '@/views/habit-history.vue'
import AddReward from './views/add-reward.vue'
// 定义路由
const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/add-habit/', component: AddHabit, name: 'add-habit' },
  { path: '/add-habit/:name', component: AddHabit, name: 'edit-habit' },
  { path: '/add-reward', component: AddReward, name: 'add-reward' },
  { path: '/add-reward/:name', component: AddReward, name: 'edit-reward' },
  { path: '/habit-list', component: HabbitList, name: 'habit-list' },
  { path: '/reward-list', component: RewardList, name: 'reward-list' },
  { path: '/habit-history', component: HabbitHistory, name: 'habit-history' },
  // 其他路由...
]

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router