<script setup>
import { useGeneralStore, useCollectionStore } from '@/stores';
import { onBeforeMount, inject } from 'vue';

const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()
const axios = inject('axios')

function copyToClipboard(collectionId) {
    const route = window.location.origin
    navigator.clipboard.writeText(`${route}/#/view/${collectionId}`)
    generalStore.setSnackbarMessage('Copied to clipboard')
    generalStore.setSnackbarColor('success')
    generalStore.showSnackbar()
}

onBeforeMount(() => {
    const endPoint = '/get-collections'
    axios.get(endPoint)
    .then(response => {
        collectionStore.setCollections(response.data.collections)
    })
    .catch(error => {
        if (error.response.status === 404) {
            collectionStore.setCollections(error.response.data.collections)
        }
    })
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col v-for="collection in collectionStore.collections" :key="collection.id" cols="12" lg="6" xl="4">
                <v-card class="pa-4 rounded-xl elevation-4" :to="{ name: 'collection', params: { id: collection.id } }">
                    <v-card-title class="text-center text-primary-darken-1">
                        {{ collection.name }} <v-icon @click.stop="copyToClipboard(collection.id)" size="x-small">mdi-content-copy</v-icon>
                    </v-card-title>
                    <v-card-text class="text-blue-grey-darken-3">
                        {{ collection.description }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>