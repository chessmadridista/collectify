<script setup>
import { useGeneralStore, useUserStore } from '@/stores'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const generalStore = useGeneralStore()
const userStore = useUserStore()
const form = ref(null)
const username = ref('')
const password = ref('')
const router = useRouter();

function getFormData() {
  const formData = new FormData()
  formData.append('username', username.value)
  formData.append('password', password.value)

  return formData
}

function login() {
  form.value.validate().then((response) => {
    if (response.valid) {
      const endPoint = '/login'
      const formData = getFormData()
      axios.post(endPoint, formData)
      .then((response) => {
        userStore.setUser(username.value)
        userStore.setUserLoggedIn()
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        router.push('/')
      })
      .catch((error) => {
        generalStore.setSnackbarMessage(error.response.data.message)
        generalStore.setSnackbarColor('error')
      })
      .finally(() => {
        generalStore.showSnackbar()
      })
    } else {
      return
    }
  })
}
</script>
<template>
  <v-container class="card-container">
    <v-row>
      <v-col>
        <v-card class="pa-4 rounded-xl">
          <v-card-title class="text-center text-blue-grey-darken-2">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <v-text-field 
                density="compact" 
                v-model="username" 
                type="text" 
                label="Username*" 
                :rules="[(v) => !!v || 'Username is required.']"
              />
              <v-text-field 
                density="compact" 
                v-model="password" 
                type="password" 
                label="Password*" 
                :rules="[(v) => !!v || 'Password is required.']"
              />
              <v-btn variant="elevated" class="rounded-pill" color="primary" block type="submit">Login</v-btn>
            </v-form>
            <p class="text-center mt-4">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.card-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
