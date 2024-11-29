<script setup>
import { useCollectionStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const name = ref('')
const form = ref(null)
const description = ref('')
const generalStore = useGeneralStore()
const collectionStore = useCollectionStore()

function createNewTask() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/create-collection'
            const formData = new FormData()
            formData.append('collection_name', name.value)
            formData.append('collection_description', description.value)
            axios.post(endPoint, formData)
                .then(response => {
                    const collection = {
                        id: response.data.collection_id,
                        name: name.value,
                        description: description.value
                    }
                    collectionStore.addCollection(collection)
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    name.value = ''
                    description.value = ''
                    collectionStore.hcollectionddNewCollectionDialog()
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
    <v-dialog v-model="collectionStore.addNewCollectionDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Add new collection</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="createNewTask">
                    <v-text-field 
                        label="What is your app collection?*" 
                        v-model="name" 
                        :rules="[v => !!v || 'This field is required.']"
                    />
                    <v-text-field v-model="description" label="Describe the collection in more detail" />
                    <div class="text-right">
                        <v-btn class="rounded-pill" type="submit" color="#28a745" prepend-icon="mdi-check">
                            Add this collection
                        </v-btn>
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>