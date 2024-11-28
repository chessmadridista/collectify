import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteStore', () => {
    const notes = ref([])
    const editNoteDialogVisibility = ref(false)
    const editedNote = ref({})
    const editedNoteDescription = ref('')

    function setNotes(newNotes) {
        notes.value = newNotes
    }
    
    function addNote(note) {
        notes.value.push(note)
    }

    function updateNote(note) {
        const index = notes.value.findIndex(f => f.id === note.id)
        notes.value[index] = note
    }

    function deleteNote(note) {
        notes.value = notes.value.filter(f => f.id !== note.id)
    }

    function showEditNoteDialog() {
        editNoteDialogVisibility.value = true
    }

    function hideEditNoteDialog() {
        editNoteDialogVisibility.value = false
    }

    function setEditedNote(note) {
        editedNote.value = note
    }

    function setEditedNoteDescription(description) {
        editedNoteDescription.value = description
    }

    return {
        notes,
        editNoteDialogVisibility,
        editedNoteDescription,
        editedNote,
        setNotes,
        addNote,
        updateNote,
        deleteNote,
        setEditedNote,
        showEditNoteDialog,
        hideEditNoteDialog,
        setEditedNoteDescription,
    }
})