import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import('../views/Homepage.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
