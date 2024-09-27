import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CaculatorView from '../views/CaculatorView.vue'
import WordsView from '../views/WordsView.vue'

/**
 * Creates a new router instance with specified routes and history mode.
 *
 * The router is configured with two routes:
 * - The root path ('/') which maps to the `CaculatorView` component with the name 'caculator'.
 * - The  path ('/words') which maps to the `WordsView` component with the name 'words'.
 *
 * @returns {Router} The configured router instance.
 */
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'caculator',
      component: CaculatorView
    }
  ]
})

export default router
