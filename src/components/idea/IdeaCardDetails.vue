<script setup>
import { useGeneralStore, useIdeaStore } from '@/stores';
import { inject, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const router = useRouter()
const generalStore = useGeneralStore()
const ideaStore = useIdeaStore()

function getIdea() {
    const endPoint = '/get-idea'
    const idea_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('idea_id', idea_id)
    axios.post(endPoint, formData)
        .then(response => {
            ideaStore.selectedIdeaName = response.data.idea.name
            ideaStore.selectedIdeaDescription = response.data.idea.description
            ideaStore.setSelectedIdea(response.data.idea)
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
            generalStore.showSnackbar()
        })
}

function editIdea() {
    const idea = {
        id: ideaStore.selectedIdea.id,
        name: ideaStore.selectedIdeaName,
        description: ideaStore.selectedIdeaDescription,
    }
    ideaStore.setSelectedIdea(idea)
    ideaStore.showEditIdeaDialog()
}

function deleteIdea() {
    ideaStore.showDeleteIdeaDialog()
}

onBeforeMount(() => {
    getIdea()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="pa-4 rounded-xl">
                    <v-card-title class="text-center text-primary-darken-1">
                        {{ ideaStore.selectedIdeaName }}
                    </v-card-title>
                    <v-card-text class="text-pre-wrap text-blue-grey-darken-3">
                        {{ ideaStore.selectedIdeaDescription }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" variant="outlined" @click="deleteIdea" class="rounded-pill" prepend-icon="mdi-delete">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="#007bff" variant="outlined" @click="editIdea" class="rounded-pill" prepend-icon="mdi-pencil">Edit</v-btn>
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