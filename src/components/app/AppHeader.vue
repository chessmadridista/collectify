<script setup>
import AppButtonLogout from './AppButtonLogout.vue'
</script>
<template>
    <v-app-bar app color="#004ba0">
        <router-link to="/" class="title-container ml-4">
            <v-app-bar-title>Idea Tracker for Indie Hackers</v-app-bar-title>
        </router-link>
        <v-spacer></v-spacer>
        <AppButtonYourLearnings />
        <AppButtonLogout />
    </v-app-bar>
</template>
<style scoped>
.title-container {
    text-decoration: none; 
    color: inherit;
}
</style>