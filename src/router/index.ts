import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/plants',
      name: 'plants',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlantsView.vue')
    },
    {
      path: '/animals',
      name: 'animals',
      component: () => import('../views/AnimalsView.vue')
    },
    {
      path: '/legendary-animals',
      name: 'legendary-animals',
      component: () => import('../views/LegendaryAnimalsView.vue')
    }
  ]
})

export default router
