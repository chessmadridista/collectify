<script setup>
import { onBeforeMount, inject } from 'vue'
import { useRouter } from 'vue-router';
import { useLinkStore, useGeneralStore, useCollectionStore } from '@/stores';

const axios = inject('axios')
const router = useRouter()
const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()
const linkStore = useLinkStore()

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

function getLinks() {
    const collectionId = router.currentRoute.value.params.id
    const endPoint = `/get-links?collection_id=${collectionId}`
    axios.get(endPoint)
    .then(response => {
        linkStore.setLinks(response.data.links)
    })
    .catch(error => {
        linkStore.setLinks(error.response.data.links)
    })
}

onBeforeMount(() => {
    getCollection()
    getLinks()
})
</script>
<template>
    <p>{{ collectionStore.selectedCollectionDescription }}</p>
    <v-container>
        <v-card class="pa-4 rounded-xl elevation-4">
            <v-card-title class="text-center text-primary-darken-1">{{ collectionStore.selectedCollectionName }}</v-card-title>
            <v-card-subtitle>{{ collectionStore.selectedCollectionDescription }}</v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item :href="link.description" target="_blank" prepend-icon="mdi-link" class="text-pre-wrap bg-blue-lighten-5 mt-2 py-4" rounded="lg" v-for="link in linkStore.links" :key="link.id">
                        {{ link.description }}
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>