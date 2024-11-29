import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collectionStore', () => {
    const collections = ref([]);
    const selectedCollectionName = ref('');
    const selectedCollectionDescription = ref('');
    const selectedCollection = ref(null);
    const addNewCollectionDialogVisibility = ref(false);
    const editCollectionDialogVisibility = ref(false)
    const deleteCollectionDialogVisibility = ref(false)

    function setCollections(updatedCollections) {
        collections.value = updatedCollections
    }

    function addCollection(collection) {
        collections.value.push(collection)
    }

    function setSelectedCollection(collection) {
        selectedCollection.value = collection
    }

    function showAddNewCollectionDialog() {
        addNewCollectionDialogVisibility.value = true
    }

    function hcollectionddNewCollectionDialog() {
        addNewCollectionDialogVisibility.value = false
    }
    
    function showEditCollectionDialog() {
        editCollectionDialogVisibility.value = true
    }

    function hideEditCollectionDialog() {
        editCollectionDialogVisibility.value = false
    }
    
    function showDeleteCollectionDialog() {
        deleteCollectionDialogVisibility.value = true
    }

    function hideDeleteCollectionDialog() {
        deleteCollectionDialogVisibility.value = false
    }

    return {
        collections,
        selectedCollectionName,
        selectedCollectionDescription,
        selectedCollection,
        addNewCollectionDialogVisibility,
        editCollectionDialogVisibility,
        deleteCollectionDialogVisibility,
        setCollections,
        addCollection,
        setSelectedCollection,
        showAddNewCollectionDialog,
        hcollectionddNewCollectionDialog,
        showEditCollectionDialog,
        hideEditCollectionDialog,
        showDeleteCollectionDialog,
        hideDeleteCollectionDialog,
    }
})