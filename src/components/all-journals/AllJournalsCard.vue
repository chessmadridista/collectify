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

function getAllJournals() {
    const endPoint = `/get-all-journals`
    axios.get(endPoint)
    .then(response => {
        journalStore.setAllJournals(response.data.journals)
    })
    .catch(error => {
        journalStore.setAllJournals(error.response.data.journals)
    })
}

onBeforeMount(() => {
    getAllJournals()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-4 rounded-xl">
                    <v-card-title class="text-center text-blue-grey-darken-2">
                        Your learnings
                    </v-card-title>
                    <v-card-text v-if="journalStore.allJournals.length > 0">
                        <v-list>
                            <v-list-item prepend-icon="mdi-book-outline" class="text-pre-wrap bg-green-lighten-5 mt-2 py-4" rounded="lg" v-for="journal in journalStore.allJournals" :key="journal.id">
                                {{ journal.description }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
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