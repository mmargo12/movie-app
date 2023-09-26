// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
      },
      {
        path: '/my',
        name: 'MyMovies',
        component: () => import('@/views/MyMovies.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
