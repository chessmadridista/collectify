<script setup>
import { useJournalStore, useGeneralStore } from '@/stores';
import { onBeforeMount, inject, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const journalStore = useJournalStore()
const generalStore = useGeneralStore()
const newJournalInputFieldVisibility = ref(false)
const router = useRouter()
const form = ref(null)
const newJournalTextAreaRef = ref(null)
const newJournal = ref('')

function addNewJournal() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const collectionId = router.currentRoute.value.params.id
            const endPoint = "/create-journal"
            const formData = new FormData()
            formData.append('collection_id', collectionId)
            formData.append('journal_description', newJournal.value)
            axios.post(endPoint, formData)
            .then(response => {
                const journal = {
                    id: response.data.journal_id,
                    collection_id: collectionId,
                    description: newJournal.value,
                }
                journalStore.addJournal(journal)
                newJournal.value = ''
                newJournalInputFieldVisibility.value = false
                generalStore.setSnackbarMessage(response.data.message)
                generalStore.setSnackbarColor('success')
                generalStore.showSnackbar()
            })
            .catch(error => {
            })
        }
    })
}

function editJournal(journal) {
    journalStore.setEditedJournalDescription(journal.description)
    journalStore.setEditedJournal(journal)
    journalStore.showEditJournalDialog()
}

function getJournals() {
    const collectionId = router.currentRoute.value.params.id
    const endPoint = `/get-journals?collection_id=${collectionId}`
    axios.get(endPoint)
    .then(response => {
        journalStore.setJournals(response.data.journals)
    })
    .catch(error => {
        journalStore.setJournals(error.response.data.journals)
    })
}

function showNewJournalInputField() {
    newJournalInputFieldVisibility.value = true
    nextTick(() => {
        if (newJournalTextAreaRef.value) {
            newJournalTextAreaRef.value.focus();
        }
    })
}

onBeforeMount(() => {
    getJournals()
})
</script>
<template>
    <v-card class="pa-4 rounded-xl">
        <v-card-title class="text-center text-blue-grey-darken-2">
            Your learnings
        </v-card-title>
        <v-card-text v-if="journalStore.journals.length > 0">
            <v-list>
                <v-list-item prepend-icon="mdi-book-outline" class="text-pre-wrap bg-green-lighten-5 mt-2 py-4" rounded="lg" v-for="journal in journalStore.journals" @click="editJournal(journal)" :key="journal.id">
                    {{ journal.description }}
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-text v-if="newJournalInputFieldVisibility">
            <v-form ref="form" @submit.prevent="addNewJournal">
                <v-textarea 
                    ref="newJournalTextAreaRef"
                    color="primary"
                    label="Describe the journal in detail*"
                    v-model="newJournal"
                    :rules="[(v) => !!v || 'This field is required.']"
                />
                <div class="text-right">
                    <v-btn class="rounded-pill" type="submit" variant="elevated" color="#28a745" prepend-icon="mdi-check">
                        Add this journal
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
        <v-card-actions v-else class="d-flex justify-end">
            <v-btn variant="elevated" color="#007bff" @click="showNewJournalInputField" prepend-icon="mdi-plus" class="rounded-pill">
                Create new journal
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}
</style>