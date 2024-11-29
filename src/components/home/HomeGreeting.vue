<script setup>
import { useUserStore, useCollectionStore } from '@/stores';

const collectionStore = useCollectionStore()
const userStore = useUserStore()

function addNewCollection() {
    collectionStore.showAddNewCollectionDialog()
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <h3 class="text-center text-blue-grey-darken-2">
                    Your app collections
                </h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p class="text-grey-darken-1">
                    👋 @{{ userStore.username }}, these are your app collections.
                </p>
            </v-col>
            <v-col class="text-right">
                <v-btn class="rounded-pill" @click="addNewCollection" color="#007bff" prepend-icon="mdi-plus">
                    Add new collection
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>