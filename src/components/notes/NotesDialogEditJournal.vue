<script setup>
import { useGeneralStore, useNoteStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const noteStore = useNoteStore()
const router = useRouter()

function updateNote() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-note'
            const formData = new FormData()
            formData.append('note_id', noteStore.editedNote.id)
            formData.append('collection_id', noteStore.editedNote.collection_id)
            formData.append('note_description', noteStore.editedNoteDescription)
            axios.post(endPoint, formData)
                .then(response => {
                    const editedNote = {
                        id: noteStore.editedNote.id,
                        collection_id: noteStore.editedNote.collection_id,
                        description: noteStore.editedNoteDescription
                    }
                    noteStore.updateNote(editedNote)
                    noteStore.setEditedNoteDescription('')
                    noteStore.setEditedNote({})
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    noteStore.hideEditNoteDialog()
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

function deleteNote() {
    const endPoint = '/delete-note'
    const collectionId = router.currentRoute.value.params.id
    const formData = new FormData()
    const noteToBeDeleted = noteStore.editedNote
    formData.append('note_id', noteToBeDeleted.id)
    formData.append('collection_id', collectionId)
    axios.post(endPoint, formData)
    .then(response => {
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        noteStore.deleteNote(noteToBeDeleted)
        generalStore.showSnackbar()
        noteStore.hideEditNoteDialog()
    })
    .catch(error => {
    })
}
</script>
<template>
    <v-dialog v-model="noteStore.editNoteDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Edit this note</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateNote">
                    <v-textarea v-model="noteStore.editedNoteDescription" label="Describe the note in detail*" 
                        :rules="[v => !!v || 'This field is required.']"    
                    />
                    <div class="d-flex justify-space-between">
                        <v-btn class="rounded-pill" color="error" prepend-icon="mdi-delete" @click="deleteNote" >
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