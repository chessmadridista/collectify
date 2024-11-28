<script setup>
import { useNoteStore, useGeneralStore } from '@/stores';
import { onBeforeMount, inject, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const noteStore = useNoteStore()
const generalStore = useGeneralStore()
const newNoteInputFieldVisibility = ref(false)
const router = useRouter()
const form = ref(null)
const newNoteTextAreaRef = ref(null)
const newNote = ref('')

function addNewNote() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const ideaId = router.currentRoute.value.params.id
            const endPoint = "/create-note"
            const formData = new FormData()
            formData.append('idea_id', ideaId)
            formData.append('note_description', newNote.value)
            axios.post(endPoint, formData)
            .then(response => {
                const note = {
                    id: response.data.note_id,
                    idea_id: ideaId,
                    description: newNote.value,
                }
                noteStore.addNote(note)
                newNote.value = ''
                newNoteInputFieldVisibility.value = false
                generalStore.setSnackbarMessage(response.data.message)
                generalStore.setSnackbarColor('success')
                generalStore.showSnackbar()
            })
            .catch(error => {
            })
        }
    })
}

function editNote(note) {
    noteStore.setEditedNoteDescription(note.description)
    noteStore.setEditedNote(note)
    noteStore.showEditNoteDialog()
}

function getNotes() {
    const ideaId = router.currentRoute.value.params.id
    const endPoint = `/get-notes?idea_id=${ideaId}`
    axios.get(endPoint)
    .then(response => {
        noteStore.setNotes(response.data.notes)
    })
    .catch(error => {
        noteStore.setNotes(error.response.data.notes)
    })
}

function showNewNoteInputField() {
    newNoteInputFieldVisibility.value = true
    nextTick(() => {
        if (newNoteTextAreaRef.value) {
            newNoteTextAreaRef.value.focus();
        }
    })
}

onBeforeMount(() => {
    getNotes()
})
</script>
<template>
    <v-card class="pa-4 rounded-xl">
        <v-card-title class="text-center text-blue-grey-darken-2">
            Your notes
        </v-card-title>
        <v-card-text v-if="noteStore.notes.length > 0">
            <v-list>
                <v-list-item prepend-icon="mdi-note-text-outline" class="text-pre-wrap bg-yellow-lighten-4 mt-2 py-4" rounded="lg" v-for="note in noteStore.notes" @click="editNote(note)" :key="note.id">
                    {{ note.description }}
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-text v-if="newNoteInputFieldVisibility">
            <v-form ref="form" @submit.prevent="addNewNote">
                <v-textarea 
                    ref="newNoteTextAreaRef"
                    color="primary"
                    label="Describe the note in detail*"
                    v-model="newNote"
                    :rules="[(v) => !!v || 'This field is required.']"
                />
                <div class="text-right">
                    <v-btn class="rounded-pill" type="submit" variant="elevated" color="#28a745" prepend-icon="mdi-check">
                        Add this note
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
        <v-card-actions v-else class="d-flex justify-end">
            <v-btn variant="elevated" color="#007bff" @click="showNewNoteInputField" prepend-icon="mdi-plus" class="rounded-pill">
                Create new note
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}
</style>