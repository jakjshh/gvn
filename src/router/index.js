import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'

import Original from '../view/Original.vue'
import Images from '../view/Images.vue'
import Articles from '../view/Articles.vue'
import Peripheral from '../view/Peripheral.vue'
import Cosplay from '../view/Cosplay.vue'
import Ideas from '../view/Ideas.vue'
import About from '../view/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/original',
    name: 'Original',
    component: Original
  },
  {
    path: '/images',
    name: 'Images',
    component: Images
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/peripheral',
    name: 'Peripheral',
    component: Peripheral
  },
  {
    path: '/cosplay',
    name: 'Cosplay',
    component: Cosplay
  },
  {
    path: '/Ideas',
    name: 'Ideas',
    component: Ideas
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router