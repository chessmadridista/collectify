<script setup>
import { RouterView, useRouter } from 'vue-router'
import AppSnackbar from '@/components/app/AppSnackbar.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import { inject, onBeforeMount } from 'vue';
import { useGeneralStore, useUserStore } from '@/stores'

const router = useRouter()
const axios = inject('axios')
const userStore = useUserStore()
const generalStore = useGeneralStore()

function showHeader() {
  const currentRouteName = router.currentRoute.value.name
  if (currentRouteName === "login" || currentRouteName === "signup") {
    return false;
  } else {
    return true;
  }
}

function checkSession() {
  const endPoint = '/check-session'
  axios.get(endPoint)
  .then(response => {
    userStore.setUser(response.data.username)
    userStore.setUserLoggedIn()
    const currentRouteName = router.currentRoute.value.name
    
    if (currentRouteName === 'login' || currentRouteName === 'signup') {
      router.push('/')
    }
  })
  .catch(error => {
    const currentRouteName = router.currentRoute.value.name

    if (currentRouteName !== 'login' && currentRouteName !== 'signup') {
      router.push('/login')
    }
  })
}

onBeforeMount(async () => {
  await router.isReady()
  checkSession()
})
</script>
<template>
  <v-app>
    <AppSnackbar />
    <AppHeader v-if="showHeader()" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
<style scoped>
.v-application {
  background: linear-gradient(135deg, #ccefff, #e0f7fa);
}
</style>