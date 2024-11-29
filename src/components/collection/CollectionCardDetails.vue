<script setup>
import { useGeneralStore, useCollectionStore } from '@/stores';
import { inject, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const router = useRouter()
const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()

function getCollection() {
    const endPoint = '/get-collection'
    const collection_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('collection_id', collection_id)
    axios.post(endPoint, formData)
        .then(response => {
            collectionStore.selectedCollectionName = response.data.collection.name
            collectionStore.selectedCollectionDescription = response.data.collection.description
            collectionStore.setSelectedCollection(response.data.collection)
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
            generalStore.showSnackbar()
        })
}

function editCollection() {
    const collection = {
        id: collectionStore.selectedCollection.id,
        name: collectionStore.selectedCollectionName,
        description: collectionStore.selectedCollectionDescription,
    }
    collectionStore.setSelectedCollection(collection)
    collectionStore.showEditCollectionDialog()
}

function deleteCollection() {
    collectionStore.showDeleteCollectionDialog()
}

onBeforeMount(() => {
    getCollection()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="pa-4 rounded-xl">
                    <v-card-title class="text-center text-primary-darken-1">
                        {{ collectionStore.selectedCollectionName }}
                    </v-card-title>
                    <v-card-text class="text-pre-wrap text-blue-grey-darken-3">
                        {{ collectionStore.selectedCollectionDescription }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" variant="outlined" @click="deleteCollection" class="rounded-pill" prepend-icon="mdi-delete">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="#007bff" variant="outlined" @click="editCollection" class="rounded-pill" prepend-icon="mdi-pencil">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}
</style>