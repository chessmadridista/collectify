import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', () => {
    const features = ref([])
    const editFeatureDialogVisibility = ref(false)
    const editedFeature = ref({})
    const editedFeatureDescription = ref('')

    function setFeatures(newFeatures) {
        features.value = newFeatures
    }

    function addFeature(feature) {
        features.value.push(feature)
    }

    function updateFeature(feature) {
        const index = features.value.findIndex(f => f.id === feature.id)
        features.value[index] = feature
    }

    function deleteFeature(feature) {
        features.value = features.value.filter(f => f.id !== feature.id)
    }

    function showEditFeatureDialog() {
        editFeatureDialogVisibility.value = true
    }

    function hideEditFeatureDialog() {
        editFeatureDialogVisibility.value = false
    }

    function setEditedFeature(feature) {
        editedFeature.value = feature
    }

    function setEditedFeatureDescription(description) {
        editedFeatureDescription.value = description
    }

    return {
        features,
        editFeatureDialogVisibility,
        editedFeatureDescription,
        editedFeature,
        setFeatures,
        addFeature,
        updateFeature,
        deleteFeature,
        setEditedFeature,
        showEditFeatureDialog,
        hideEditFeatureDialog,
        setEditedFeatureDescription,
    }
})