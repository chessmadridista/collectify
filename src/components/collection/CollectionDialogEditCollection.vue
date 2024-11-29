<script setup>
import { useCollectionStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()

function updateCollection() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-collection'
            const formData = new FormData()
            formData.append('collection_id', collectionStore.selectedCollection.id)
            formData.append('collection_name', collectionStore.selectedCollection.name)
            formData.append('collection_description', collectionStore.selectedCollection.description)
            axios.post(endPoint, formData)
                .then(response => {
                    collectionStore.selectedCollectionName = collectionStore.selectedCollection.name
                    collectionStore.selectedCollectionDescription = collectionStore.selectedCollection.description
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    collectionStore.hideEditCollectionDialog()
                })
                .catch(error => {
                    generalStore.setSnackbarMessage(error)
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
    <v-dialog v-model="collectionStore.editCollectionDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Edit this collection</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateCollection">
                    <v-text-field 
                        label="What is your app collection?*" 
                        v-model="collectionStore.selectedCollection.name" 
                        :rules="[v => !!v || 'This field is required.']"
                    />
                    <v-textarea v-model="collectionStore.selectedCollection.description" label="Describe the collection in more detail" />
                    <div class="text-right">
                        <v-btn type="submit" color="#28a745" prepend-icon="mdi-check" class="rounded-pill">
                            Update
                        </v-btn>
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>