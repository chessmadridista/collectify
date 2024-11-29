<script setup>
import { useGeneralStore, useLinkStore } from '@/stores'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const linkStore = useLinkStore()
const router = useRouter()

function updateLink() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-link'
            const formData = new FormData()
            formData.append('link_id', linkStore.editedLink.id)
            formData.append('collection_id', linkStore.editedLink.collection_id)
            formData.append('link_description', linkStore.editedLinkDescription)
            axios.post(endPoint, formData)
                .then(response => {
                    const editedLink = {
                        id: linkStore.editedLink.id,
                        collection_id: linkStore.editedLink.collection_id,
                        description: linkStore.editedLinkDescription
                    }
                    linkStore.updateLink(editedLink)
                    linkStore.setEditedLinkDescription('')
                    linkStore.setEditedLink({})
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    linkStore.hideEditLinkDialog()
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

function deleteLink() {
    const endPoint = '/delete-link'
    const collectionId = router.currentRoute.value.params.id
    const formData = new FormData()
    const linkToBeDeleted = linkStore.editedLink
    formData.append('link_id', linkToBeDeleted.id)
    formData.append('collection_id', collectionId)
    axios.post(endPoint, formData)
    .then(response => {
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        linkStore.deleteLink(linkToBeDeleted)
        generalStore.showSnackbar()
        linkStore.hideEditLinkDialog()
    })
    .catch(error => {
    })
}
</script>
<template>
    <v-dialog v-model="linkStore.editLinkDialogVisibility">
        <v-card class="pa-4 rounded-xl">
            <v-card-title class="text-center text-blue-grey-darken-2">Edit this link</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateLink">
                    <v-textarea v-model="linkStore.editedLinkDescription" label="Describe the link in detail*" 
                        :rules="[v => !!v || 'This field is required.']"    
                    />
                    <div class="d-flex justify-space-between">
                        <v-btn class="rounded-pill" color="error" prepend-icon="mdi-delete" @click="deleteLink" >
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