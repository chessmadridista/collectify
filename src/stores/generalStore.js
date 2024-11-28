import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore', () => {
  const snackbar = ref(false)
  const snackbarColor = ref('success')
  const snackbarMessage = ref('This is a default message.')

  function showSnackbar() {
    snackbar.value = true
  }

  function setSnackbarColor(color) {
    snackbarColor.value = color
  }

  function setSnackbarMessage(message) {
    snackbarMessage.value = message
  }

  return {
    snackbar,
    snackbarColor,
    snackbarMessage,
    showSnackbar,
    setSnackbarColor,
    setSnackbarMessage
  }
})
