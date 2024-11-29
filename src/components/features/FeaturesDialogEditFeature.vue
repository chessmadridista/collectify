<script setup>
import { useGeneralStore, useFeatureStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const featureStore = useFeatureStore()
const router = useRouter()

function updateFeature() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-feature'
            const formData = new FormData()
            formData.append('feature_id', featureStore.editedFeature.id)
            formData.append('collection_id', featureStore.editedFeature.collection_id)
            formData.append('feature_description', featureStore.editedFeatureDescription)
            axios.post(endPoint, formData)
                .then(response => {
                    const editedFeature = {
                        id: featureStore.editedFeature.id,
                        collection_id: featureStore.editedFeature.collection_id,
                        description: featureStore.editedFeatureDescription
                    }
                    featureStore.updateFeature(editedFeature)
                    featureStore.setEditedFeatureDescription('')
                    featureStore.setEditedFeature({})
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    featureStore.hideEditFeatureDialog()
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

function deleteFeature() {
    const endPoint = '/delete-feature'
    const collectionId = router.currentRoute.value.params.id
    const formData = new FormData()
    const featureToBeDeleted = featureStore.editedFeature
    formData.append('feature_id', featureToBeDeleted.id)
    formData.append('collection_id', collectionId)
    axios.post(endPoint, formData)
    .then(response => {
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        featureStore.deleteFeature(featureToBeDeleted)
        generalStore.showSnackbar()
        featureStore.hideEditFeatureDialog()
    })
    .catch(error => {
    })
}
</script>
<template>
    <v-dialog v-model="featureStore.editFeatureDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Edit this feature</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateFeature">
                    <v-textarea v-model="featureStore.editedFeatureDescription" label="Describe the feature in detail*" 
                        :rules="[v => !!v || 'This field is required.']"    
                    />
                    <div class="d-flex justify-space-between">
                        <v-btn class="rounded-pill" color="error" prepend-icon="mdi-delete" @click="deleteFeature" >
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