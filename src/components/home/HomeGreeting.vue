<script setup>
import { useUserStore, useIdeaStore } from '@/stores';

const ideaStore = useIdeaStore()
const userStore = useUserStore()

function addNewIdea() {
    ideaStore.showAddNewIdeaDialog()
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <h3 class="text-center text-blue-grey-darken-2">
                    Your app ideas
                </h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p class="text-grey-darken-1">
                    👋 @{{ userStore.username }}, these are your app ideas.
                </p>
            </v-col>
            <v-col class="text-right">
                <v-btn class="rounded-pill" @click="addNewIdea" color="#007bff" prepend-icon="mdi-plus">
                    Add new idea
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>