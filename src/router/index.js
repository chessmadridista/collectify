import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { inject } from 'vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import CollectionView from '@/views/CollectionView.vue'
import AllJournalsView from '@/views/AllJournalsView.vue'
import SharedCollectionView from '@/views/SharedCollectionView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/journals',
      name: 'journals',
      component: AllJournalsView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/view/:id',
      name: 'view',
      component: SharedCollectionView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const axios = inject('axios')
  const userStore = useUserStore()

  if (userStore.isUserLoggedIn) {
    if (to.name === 'login' || to.name === 'signup') {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    if (userStore.isUserLoggedIn === null) {
      const endPoint = '/check-session'
      axios.get(endPoint)
      .then(response => {
        if (response.status === 200) {
          userStore.setUser(response.data.username)
          userStore.setUserLoggedIn()
          next()
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          userStore.setUser('')
          userStore.setUserLoggedOut()
          next({ name: 'login' })
        }
      })
    } else {
        if (to.name !== 'login' && to.name !== 'signup') {
          next({ name: 'login' })
        } else {
          next()
        }
    }
  }
})

export default router
