<script setup>
import { useGeneralStore, useUserStore } from '@/stores';
import { inject } from 'vue';
import { useRouter } from 'vue-router'

const axios = inject('axios')
const generalStore = useGeneralStore()
const userStore = useUserStore()
const router = useRouter()

function logout() {
    const endPoint = '/logout'
    axios.post(endPoint)
        .then((response) => {
            userStore.setUser('')
            userStore.setUserLoggedOut()
            generalStore.setSnackbarMessage('You have been logged out successfully.')
            generalStore.setSnackbarColor('success')
            router.push('login')
        })
        .catch((error) => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}
</script>
<template>
    <v-btn @click="logout" class="rounded-pill" prepend-icon="mdi-logout">
        Logout
    </v-btn>
</template>