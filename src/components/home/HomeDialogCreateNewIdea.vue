<script setup>
import { useIdeaStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const name = ref('')
const form = ref(null)
const description = ref('')
const generalStore = useGeneralStore()
const ideaStore = useIdeaStore()

function createNewTask() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/create-idea'
            const formData = new FormData()
            formData.append('idea_name', name.value)
            formData.append('idea_description', description.value)
            axios.post(endPoint, formData)
                .then(response => {
                    const idea = {
                        id: response.data.idea_id,
                        name: name.value,
                        description: description.value
                    }
                    ideaStore.addIdea(idea)
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    name.value = ''
                    description.value = ''
                    ideaStore.hideAddNewIdeaDialog()
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
    <v-dialog v-model="ideaStore.addNewIdeaDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Add new idea</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="createNewTask">
                    <v-text-field 
                        label="What is your app idea?*" 
                        v-model="name" 
                        :rules="[v => !!v || 'This field is required.']"
                    />
                    <v-text-field v-model="description" label="Describe the idea in more detail" />
                    <div class="text-right">
                        <v-btn class="rounded-pill" type="submit" color="#28a745" prepend-icon="mdi-check">
                            Add this idea
                        </v-btn>
                    </div>
                </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>