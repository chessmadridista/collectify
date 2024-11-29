<script setup>
import { useCollectionStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()
const router = useRouter()

function no() {
    collectionStore.hideDeleteCollectionDialog()
}

function yes() {
    const endPoint = '/delete-collection'
    const collection_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('collection_id', collection_id)
    axios.post(endPoint, formData)
        .then(response => {
            generalStore.setSnackbarMessage(response.data.message)
            generalStore.setSnackbarColor('success')
            collectionStore.hideDeleteCollectionDialog()
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
    <v-dialog v-model="collectionStore.deleteCollectionDialogVisibility">
        <v-card class="pa-4 rounded-xl delete-collection-card">
            <v-card-title class="text-center">Do you want to delete this collection?</v-card-title>
            <v-card-actions>
                <v-btn color="#007bff" class="rounded-pill" variant="outlined" @click="no">No</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" class="rounded-pill" variant="outlined" @click="yes">Yes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped>
.delete-collection-card {
    max-width: 500px;
    margin: auto;
}
</style>