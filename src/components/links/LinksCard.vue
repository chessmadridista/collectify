<script setup>
import { useLinkStore, useGeneralStore } from '@/stores';
import { onBeforeMount, inject, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const linkStore = useLinkStore()
const generalStore = useGeneralStore()
const newLinkInputFieldVisibility = ref(false)
const router = useRouter()
const form = ref(null)
const newLinkTextAreaRef = ref(null)
const newLink = ref('')

function addNewLink() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const collectionId = router.currentRoute.value.params.id
            const endPoint = "/create-link"
            const formData = new FormData()
            formData.append('collection_id', collectionId)
            formData.append('link_description', newLink.value)
            axios.post(endPoint, formData)
            .then(response => {
                const link = {
                    id: response.data.link_id,
                    collection_id: collectionId,
                    description: newLink.value,
                }
                linkStore.addLink(link)
                newLink.value = ''
                newLinkInputFieldVisibility.value = false
                generalStore.setSnackbarMessage(response.data.message)
                generalStore.setSnackbarColor('success')
                generalStore.showSnackbar()
            })
            .catch(error => {
            })
        }
    })
}

function editLink(link) {
    linkStore.setEditedLinkDescription(link.description)
    linkStore.setEditedLink(link)
    linkStore.showEditLinkDialog()
}

function getLinks() {
    const collectionId = router.currentRoute.value.params.id
    const endPoint = `/get-links?collection_id=${collectionId}`
    axios.get(endPoint)
    .then(response => {
        linkStore.setLinks(response.data.links)
    })
    .catch(error => {
        linkStore.setLinks(error.response.data.links)
    })
}

function showNewLinkInputField() {
    newLinkInputFieldVisibility.value = true
    nextTick(() => {
        if (newLinkTextAreaRef.value) {
            newLinkTextAreaRef.value.focus();
        }
    })
}

onBeforeMount(() => {
    getLinks()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">

                <v-card class="pa-4 rounded-xl">
                    <v-card-title class="text-center text-blue-grey-darken-2">
                        Links
                    </v-card-title>
                    <v-card-text v-if="linkStore.links.length > 0">
                        <v-list>
                            <v-list-item :href="link.description" target="_blank" prepend-icon="mdi-link" class="text-pre-wrap bg-blue-lighten-5 mt-2 py-4" rounded="lg" v-for="link in linkStore.links" :key="link.id">
                                {{ link.description }}
                                <template v-slot:append>
                                    <v-icon color="primary" class="mr-2" @click.prevent="editLink(link)">mdi-pencil</v-icon>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-text v-if="newLinkInputFieldVisibility">
                        <v-form ref="form" @submit.prevent="addNewLink">
                            <v-textarea 
                                ref="newLinkTextAreaRef"
                                color="primary"
                                label="Link*"
                                v-model="newLink"
                                :rules="[(v) => !!v || 'This field is required.']"
                            />
                            <div class="text-right">
                                <v-btn class="rounded-pill" type="submit" variant="elevated" color="#28a745" prepend-icon="mdi-check">
                                    Add this link
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions v-else class="d-flex justify-end">
                        <v-btn variant="elevated" color="#007bff" @click="showNewLinkInputField" prepend-icon="mdi-plus" class="rounded-pill">
                            Add link
                        </v-btn>
                    </v-card-actions>
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