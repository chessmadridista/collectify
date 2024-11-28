<script setup>
import { useGeneralStore, useJournalStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const journalStore = useJournalStore()
const router = useRouter()

function updateJournal() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-journal'
            const formData = new FormData()
            formData.append('journal_id', journalStore.editedJournal.id)
            formData.append('idea_id', journalStore.editedJournal.idea_id)
            formData.append('journal_description', journalStore.editedJournalDescription)
            axios.post(endPoint, formData)
                .then(response => {
                    const editedJournal = {
                        id: journalStore.editedJournal.id,
                        idea_id: journalStore.editedJournal.idea_id,
                        description: journalStore.editedJournalDescription
                    }
                    journalStore.updateJournal(editedJournal)
                    journalStore.setEditedJournalDescription('')
                    journalStore.setEditedJournal({})
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    journalStore.hideEditJournalDialog()
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

function deleteJournal() {
    const endPoint = '/delete-journal'
    const ideaId = router.currentRoute.value.params.id
    const formData = new FormData()
    const journalToBeDeleted = journalStore.editedJournal
    formData.append('journal_id', journalToBeDeleted.id)
    formData.append('idea_id', ideaId)
    axios.post(endPoint, formData)
    .then(response => {
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        journalStore.deleteJournal(journalToBeDeleted)
        generalStore.showSnackbar()
        journalStore.hideEditJournalDialog()
    })
    .catch(error => {
    })
}
</script>
<template>
    <v-dialog v-model="journalStore.editJournalDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Edit this journal</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateJournal">
                    <v-textarea v-model="journalStore.editedJournalDescription" label="Describe the journal in detail*" 
                        :rules="[v => !!v || 'This field is required.']"    
                    />
                    <div class="d-flex justify-space-between">
                        <v-btn class="rounded-pill" color="error" prepend-icon="mdi-delete" @click="deleteJournal" >
                            Delete
                        </v-btn>
                        <v-btn class="rounded-pill" type="submit" color="#28a745" prepend-icon="mdi-check">
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