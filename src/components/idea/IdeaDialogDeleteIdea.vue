<script setup>
import { useIdeaStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const generalStore = useGeneralStore()
const ideaStore = useIdeaStore()
const router = useRouter()

function no() {
    ideaStore.hideDeleteIdeaDialog()
}

function yes() {
    const endPoint = '/delete-idea'
    const idea_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('idea_id', idea_id)
    axios.post(endPoint, formData)
        .then(response => {
            generalStore.setSnackbarMessage(response.data.message)
            generalStore.setSnackbarColor('success')
            ideaStore.hideDeleteIdeaDialog()
            router.push('/')
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}
</script>
<template>
    <v-dialog v-model="ideaStore.deleteIdeaDialogVisibility">
        <v-card class="pa-4 rounded-xl delete-idea-card">
            <v-card-title class="text-center">Do you want to delete this idea?</v-card-title>
            <v-card-actions>
                <v-btn color="#007bff" class="rounded-pill" variant="outlined" @click="no">No</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" class="rounded-pill" variant="outlined" @click="yes">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped>
.delete-idea-card {
    max-width: 400px;
    margin: auto;
}
</style>