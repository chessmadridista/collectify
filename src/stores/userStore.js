import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const username = ref('')
  const isUserLoggedIn = ref(null)

  function setUser(newUsername) {
    username.value = newUsername
  }

  function setUserLoggedIn() {
    isUserLoggedIn.value = true
  }

  function setUserLoggedOut() {
    isUserLoggedIn.value = false
  }

  return {
    username,
    isUserLoggedIn,
    setUser,
    setUserLoggedIn,
    setUserLoggedOut,
  }
})
