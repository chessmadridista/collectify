<script setup>
import { useCollectionStore } from '@/stores';
import { onBeforeMount, inject } from 'vue';

const collectionStore = useCollectionStore()
const axios = inject('axios')

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
                        {{ collection.name }}
                    </v-card-title>
                    <v-card-text class="text-blue-grey-darken-3">
                        {{ collection.description }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>