import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLinkStore = defineStore('linkStore', () => {
    const links = ref([])
    const editLinkDialogVisibility = ref(false)
    const editedLink = ref({})
    const editedLinkDescription = ref('')

    function setLinks(newLinks) {
        links.value = newLinks
    }

    function addLink(link) {
        links.value.push(link)
    }

    function updateLink(link) {
        const index = links.value.findIndex(f => f.id === link.id)
        links.value[index] = link
    }

    function deleteLink(link) {
        links.value = links.value.filter(f => f.id !== link.id)
    }

    function showEditLinkDialog() {
        editLinkDialogVisibility.value = true
    }

    function hideEditLinkDialog() {
        editLinkDialogVisibility.value = false
    }

    function setEditedLink(link) {
        editedLink.value = link
    }

    function setEditedLinkDescription(description) {
        editedLinkDescription.value = description
    }

    return {
        links,
        editLinkDialogVisibility,
        editedLinkDescription,
        editedLink,
        setLinks,
        addLink,
        updateLink,
        deleteLink,
        setEditedLink,
        showEditLinkDialog,
        hideEditLinkDialog,
        setEditedLinkDescription,
    }
})