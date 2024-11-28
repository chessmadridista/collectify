import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journalStore', () => {
    const journals = ref([])
    const allJournals = ref([])
    const editJournalDialogVisibility = ref(false)
    const editedJournal = ref({})
    const editedJournalDescription = ref('')

    function setJournals(newJournals) {
        journals.value = newJournals
    }
    
    function setAllJournals(newJournals) {
        allJournals.value = newJournals
    }

    function addJournal(journal) {
        journals.value.push(journal)
    }

    function updateJournal(journal) {
        const index = journals.value.findIndex(f => f.id === journal.id)
        journals.value[index] = journal
    }

    function deleteJournal(journal) {
        journals.value = journals.value.filter(f => f.id !== journal.id)
    }

    function showEditJournalDialog() {
        editJournalDialogVisibility.value = true
    }

    function hideEditJournalDialog() {
        editJournalDialogVisibility.value = false
    }

    function setEditedJournal(journal) {
        editedJournal.value = journal
    }

    function setEditedJournalDescription(description) {
        editedJournalDescription.value = description
    }

    return {
        journals,
        editJournalDialogVisibility,
        editedJournalDescription,
        editedJournal,
        allJournals,
        setAllJournals,
        setJournals,
        addJournal,
        updateJournal,
        deleteJournal,
        setEditedJournal,
        showEditJournalDialog,
        hideEditJournalDialog,
        setEditedJournalDescription,
    }
})