import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIdeaStore = defineStore('ideaStore', () => {
    const ideas = ref([]);
    const selectedIdeaName = ref('');
    const selectedIdeaDescription = ref('');
    const selectedIdea = ref(null);
    const addNewIdeaDialogVisibility = ref(false);
    const editIdeaDialogVisibility = ref(false)
    const deleteIdeaDialogVisibility = ref(false)

    function setIdeas(updatedIdeas) {
        ideas.value = updatedIdeas
    }

    function addIdea(idea) {
        ideas.value.push(idea)
    }

    function setSelectedIdea(idea) {
        selectedIdea.value = idea
    }

    function showAddNewIdeaDialog() {
        addNewIdeaDialogVisibility.value = true
    }

    function hideAddNewIdeaDialog() {
        addNewIdeaDialogVisibility.value = false
    }
    
    function showEditIdeaDialog() {
        editIdeaDialogVisibility.value = true
    }

    function hideEditIdeaDialog() {
        editIdeaDialogVisibility.value = false
    }
    
    function showDeleteIdeaDialog() {
        deleteIdeaDialogVisibility.value = true
    }

    function hideDeleteIdeaDialog() {
        deleteIdeaDialogVisibility.value = false
    }

    return {
        ideas,
        selectedIdeaName,
        selectedIdeaDescription,
        selectedIdea,
        addNewIdeaDialogVisibility,
        editIdeaDialogVisibility,
        deleteIdeaDialogVisibility,
        setIdeas,
        addIdea,
        setSelectedIdea,
        showAddNewIdeaDialog,
        hideAddNewIdeaDialog,
        showEditIdeaDialog,
        hideEditIdeaDialog,
        showDeleteIdeaDialog,
        hideDeleteIdeaDialog,
    }
})